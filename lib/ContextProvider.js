const React = require('react');

const WaypostContext = React.createContext();

// const [_, setRenderCount] = React.useState(0);

// React.useEffect(() => {
//   if (!sdkClient) return;

//   sdkClient.setRenderer(() => {
//     setRenderCount((v) => v + 1);
//   });
//   // Cleanup by setting the function to nothing
//   return () => {
//     sdkClient.setRenderer(() => {});
//   };
// }, [sdkClient]);
const WaypostProvider = ({ children, config }) => {
  const [ sdkClient, setSdkClient ] = React.useState();
  React.useEffect(() => {
    const connect = async () => {
      const client = await config.connect();
      console.log(client);
      setSdkClient(client);
    }
    connect();
  }, []);

  if (!sdkClient) return null;
  return (
    <WaypostContext.Provider value={{sdkClient}}>
      {children}
    </WaypostContext.Provider>
  );
}

module.exports = { WaypostContext, WaypostProvider };