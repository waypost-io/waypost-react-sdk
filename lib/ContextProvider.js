const React = require("react");

const WaypostContext = React.createContext();

const WaypostProvider = ({ children, config }) => {
  const [sdkClient, setSdkClient] = React.useState();
  const [clientSet, setClientSet] = React.useState(false);

  React.useEffect(() => {
    const connect = async () => {
      const client = await config.connect();
      await setSdkClient(client);
      setClientSet(true);
    };
    connect();
  }, []);

  React.useEffect(() => {
    if (!clientSet) return;

    let eventSource = new EventSource(`${config.providerAddress}/stream?sdk_key=${config.sdkKey}`);
    eventSource.onmessage = (e) => {
      // Make a deep copy of sdkClient
      const newClient = Object.assign(
        Object.create(Object.getPrototypeOf(sdkClient)),
        sdkClient
      );
      // Update the feature flags
      newClient.setFeatureFlags(JSON.parse(e.data));
      setSdkClient(newClient);
    };
  }, [clientSet]);

  if (!sdkClient) return null;
  return (
    <WaypostContext.Provider value={{ sdkClient }}>
      {children}
    </WaypostContext.Provider>
  );
};

module.exports = { WaypostContext, WaypostProvider };
