Config = require('./Config');

const config = new Config('12345', 1000).connect();
const sdkClient = config.client;
// sdkClient.addContext({ userId: "abcde" });

const logStatus = () => {
  if (sdkClient.evaluateFlag("Test Flag 1")) {
    console.log("Flag is on");
  } else {
    console.log("Flag is off");
  }
}

setInterval(logStatus, 1000);