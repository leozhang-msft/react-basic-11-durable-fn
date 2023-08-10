import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState('Loading msg from API...');

  useEffect(() => {
    (async function () {
      const API_PATH = '/api/orchestrators/HelloOrchestrator'

      // get the status query from the orchestrator
      let { statusQueryGetUri } = await( await fetch(API_PATH)).json();
      // remove the host name from the status query
      statusQueryGetUri = statusQueryGetUri.substring(statusQueryGetUri.indexOf('/runtime/'));
      console.log(statusQueryGetUri);

      let statusJson = await (await fetch(statusQueryGetUri)).json();
      console.log(statusJson);

      // wait for the function to complete
      while(statusJson.runtimeStatus === "Running" || statusJson.runtimeStatus === "Pending") {
        // sleep 1s
        await new Promise(resolve => setTimeout(resolve, 1000));

        statusJson = await (await fetch(statusQueryGetUri)).json();
        console.log(statusJson);
      }

      // display the output
      console.log(typeof(statusJson.output))
      setData(statusJson.output.join(', '));
    })();
  }, []);

  return <div>{data}</div>;
}

function About() {
  return <div>About</div>;
}

function App() {
  return (
    <BrowserRouter>

      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>

      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />

    </BrowserRouter>
  )
}

export default App;
