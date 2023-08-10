import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('Loading msg from API...');

  useEffect(() => {
    (async function () {
      const API_PATH = '/api/orchestrators/HelloOrchestrator'

      let { statusQueryGetUri } = await( await fetch(API_PATH)).json();
      statusQueryGetUri = "api" + statusQueryGetUri.substring(statusQueryGetUri.indexOf('/runtime/'));
      console.log(statusQueryGetUri);

      let statusJson = await (await fetch(statusQueryGetUri)).json();
      console.log(statusJson);

      while(statusJson.runtimeStatus === "Running") {
        statusJson = await (await fetch(statusQueryGetUri)).json();
        console.log(statusJson);
      }

      console.log(typeof(statusJson.output))
      setData(statusJson.output.join(', '));
    })();
  }, []);

  return <div>{data}</div>;
}

export default App;
