const React = require('react');

const WaypostContext = React.createContext();

const WaypostProvider = ({ children, config }) => {
  const [ sdkClient, setSdkClient ] = React.useState();

  React.useEffect(() => {
    const connect = async () => {
      const client = await config.connect();
      setSdkClient(client);
    }
    connect();

    // let eventSource = new EventSource(`${config.api_address}/stream`);
    // eventSource.onmessage = e => {
      // copy sdk Client
      // newClient = JSON.parse(JSON.stringify(sdkClient));
      // change the feature flags on it
      // newClient.setFeatureFlags(JSON.parse(e.data));
      // setSdkClient(newClient);
    // }
  }, []);

  if (!sdkClient) return null;
  return (
    <WaypostContext.Provider value={{sdkClient}}>
      {children}
    </WaypostContext.Provider>
  );
}

module.exports = { WaypostContext, WaypostProvider };