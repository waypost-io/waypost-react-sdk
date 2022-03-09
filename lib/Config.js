const Client = require("./Client.js");

class Config {
  constructor(sdkKey, api_address, pollingInterval) {
    this.sdkKey = sdkKey;
    this.api_address = api_address;
    this.pollingInterval = pollingInterval; // in milliseconds
  }

  async connect() {
    const client = new Client(this);
    // Get initial data
    await client.poll();
    return client;
  }
}

module.exports = Config;