const React = require('react');

const WaypostContext = React.createContext();

const WaypostProvider = ({ children, config }) => {
  const [ sdkClient, setSdkClient ] = React.useState();
  // const [ featureFlags, setFeatureFlags ] = React.useState();

  React.useEffect(() => {
    const connect = async () => {
      const client = await config.connect();
      setSdkClient(client);
      // setFeatureFlags(client.featureFlags);
    }
    connect();
    // If we use SSE:
    // let eventSource = new EventSource(`${config.api_address}/stream`);
    // eventSource.onmessage = e => {
    //  sdkClient.setFeatureFlags(JSON.parse(e.data));
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