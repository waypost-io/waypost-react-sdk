const React = require('react');

const WaypostContext = React.createContext();

const WaypostProvider = ({ children, sdkClient }) => {
  const [_, setRenderCount] = React.useState(0);

  React.useEffect(() => {
    if (!sdkClient) return;

    sdkClient.setRenderer(() => {
      setRenderCount((v) => v + 1);
    });
    // Cleanup by setting the function to nothing
    return () => {
      sdkClient.setRenderer(() => {});
    };
  }, [sdkClient]);

  return (
    <WaypostContext.Provider value={{sdkClient}}>
      {children}
    </WaypostContext.Provider>
  );
}

module.exports = { WaypostContext, WaypostProvider };