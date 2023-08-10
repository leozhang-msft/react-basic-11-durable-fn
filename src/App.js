import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('Loading msg from API...');

  useEffect(() => {
    (async function () {
      const API_PATH = '/api/orchestrators/HelloOrchestrator'

      let { statusQueryGetUri } = await( await fetch(API_PATH)).json();
      // nevermind, this doesn't work, directs to the react app.
      statusQueryGetUri = "api" + statusQueryGetUri.substring(statusQueryGetUri.indexOf('/runtime/'));
      console.log(statusQueryGetUri);

      let status = await (await fetch(statusQueryGetUri)).json();
      console.log(status);

      while(status.runtimeStatus === "Running") {
        status = await (await fetch(statusQueryGetUri)).json();
        console.log(status);
      }

      setData(status);
    })();
  }, []);

  return <div>{data}</div>;
}

export default App;
