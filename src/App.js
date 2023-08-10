import React, { useState, useEffect } from 'react';

function App() {
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

export default App;
