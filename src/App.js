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

      const status = (await fetch(statusQueryGetUri));
      const body = status.body
      console.log(body);

      setData(statusQueryGetUri);
    })();
  }, []);

  return <div>{data}</div>;
}

export default App;
