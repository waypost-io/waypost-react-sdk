const Client = require("./Client.js");

class Config {
  constructor(sdkKey, api_address, pollingInterval) {
    this.sdkKey = sdkKey;
    this.api_address = api_address;
    this.pollingInterval = pollingInterval; // in milliseconds
    this.client = undefined;
  }

  async connect() {
    const client = new Client(this);
    // this.client = client;
    // Get initial data
    await client.poll();
    // client.startPolling();
    return client;
  }
}

module.exports = Config;