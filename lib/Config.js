const Client = require("./Client.js");

class Config {
  constructor(sdkKey, providerAddress) {
    this.sdkKey = sdkKey;
    this.providerAddress = providerAddress;
  }

  async connect() {
    try {
      const client = new Client(this);
      await client.getFlagData();
      return client;
    } catch (err) {
      console.log("could not connect");
    }
  }
}

module.exports = Config;
