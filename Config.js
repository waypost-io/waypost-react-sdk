const Client = require("./Client");

class Config {
  constructor(sdkKey, api_address, pollingInterval) {
    this.sdkKey = sdkKey;
    this.api_address = api_address;
    this.pollingInterval = pollingInterval; // in milliseconds
    this.client = undefined;
  }

  connect() {
    const client = new Client(this);
    this.client = client;
    client.startPolling();
    return this;
  }
}

module.exports = Config