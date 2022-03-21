const Client = require("./Client.js");

class Config {
  constructor(sdkKey, api_address) {
    this.sdkKey = sdkKey;
    this.api_address = api_address;
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
