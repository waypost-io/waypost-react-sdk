# Waypost Client-Side SDK for JavaScript
## Internal instructions
For testing in React apps, remember to run `npm run build` for Webpack bundling, then run `npm pack` to package into a Tarball so that it can be imported as a node module.
It can then be imported in other apps via `npm install {filepath}/waypost-sdk-react`.
# Official Usage Docs
This is Waypost's SDK for React web applications.
1. Install via `npm install waypost-sdk-react`
2. Import the package at the top of your React application's `App.js` file.
  Inside the `Config` constructor, the first argument is your SDK Key that you can get from the Waypost feature flag manager UI. The second argument is the address of the Waypost flag provider service.
   See the example code below:
```
import * as waypost from 'waypost-sdk-react';

const { Config, WaypostProvider } = waypost;
const config = new Config('1a2b3c4d5e', "http://localhost:5050");
```
3. Wrap your App component inside the `WaypostProvider` context provider. Example:
```
function App() {
  return (
    <WaypostProvider config={config}>
      ...
    </WaypostProvider>
  );
}
```
4. Now you can access the `sdkClient` from other parts of the app by using:
 ```
 const { sdkClient } = useContext(WaypostContext)
 ```
5. To add the user_id or any other identifier to the SDK, which will assign the treatment (whether they will receive the feature), use the `addContext()` method on the `sdkClient`, and pass in an object containing the key `userId` and the value. Example:
```
sdkClient.addContext({ userId: newUserId });
```
6. Wherever you need to branch your code based on the feature flag status, call the `evaluateFlag()` method on the `sdkClient` object. The `evaluateFlag()` method takes the name of the feature flag as the required argument, and optionally a default value if the feature flag data is unavailable. The function returns a *boolean* denoting whether the status is on or off (if a userId is provided, it is decided based on a hashing algorithm).
Example:
```
const useNewHeader = sdkClient.evaluateFlag('Turquoise Header', false);
if (useNewHeader) {
  return <NewHeader />
} else {
  return <Header />
}
```