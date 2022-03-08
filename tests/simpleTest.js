const Config = require('../lib/Config.js');

const config = new Config('12345', "http://localhost:5000", 1000).connect();
const sdkClient = config.client;
// sdkClient.addContext({ userId: "abcde" });

const logStatus = () => {
  if (sdkClient.evaluateFlag("Test Flag 1", false)) {
    console.log("Flag is on");
  } else {
    console.log("Flag is off");
  }
}

setInterval(logStatus, 1000);