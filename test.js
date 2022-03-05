Config = require('./Config');

const config = new Config('12345', 1000).connect();
const sdkClient = config.client;

const logStatus = () => {
  if (sdkClient.getFeature("Test Flag 1")) {
    console.log("Flag is on");
  } else {
    console.log("Flag is off");
  }
}

setInterval(logStatus, 1000);