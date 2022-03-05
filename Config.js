const Client = require("./Client");

class Config {
  constructor(sdkKey, pollingInterval) {
    this.sdkKey = sdkKey;
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