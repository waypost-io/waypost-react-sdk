const Config = require('../lib/Config.js');

let sdkClient;
(async () => {
  sdkClient = await new Config('12345', "http://localhost:5000").connect();
})();
// sdkClient.addContext({ userId: "abcde" });

const logStatus = () => {
  if (sdkClient.evaluateFlag("Test flag 1", false)) {
    console.log("Flag is on");
  } else {
    console.log("Flag is off");
  }
}

setInterval(logStatus, 1000);