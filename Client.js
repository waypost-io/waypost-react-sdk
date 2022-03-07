const axios = require('axios');
const userInRollout = require('./userIdHash');

class Client {
  constructor(config) {
    this.config = config;
    this.context = undefined;
    this.featureFlags = {};
  }

  // Developer must specify a userId key in their argument object
  addContext(contextObj) {
    if (!contextObj || !contextObj.userId) {
      throw new TypeError("Function must take an object containing a userId property");
    }
    this.context = contextObj;
  }

  async startPolling() {
    while (true) {
      await this.poll();
      await this.delay();
    }
  }

  async delay() {
    await new Promise(resolve => setTimeout(resolve, this.config.pollingInterval));
  }

  async poll() {
    const res = await axios.get(`${this.config.api_address}/api/flags?sdk_key=${this.config.sdkKey}`);
    res.data.forEach(flag => {
      this.featureFlags[flag.name] = flag;
    });
  }

  // defaultVal is a boolean
  evaluateFlag(featureName, defaultVal) {
    const featureData = this.featureFlags[featureName];

    if (featureData === undefined) {
      if (!defaultVal) {
        throw new TypeError("Must supply a default value argument");
      }
      return defaultVal;
    }

    if (this.context === undefined || featureData.status === false) {
      return featureData.status;
    }

    return userInRollout(this.context.userId, featureData['percent_on']);
  }
}

module.exports = Client;