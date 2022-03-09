const axios = require('axios');
const userInRollout = require('./userIdHash.js');

class Client {
  constructor(config) {
    this.config = config;
    this.context = undefined;
    this.featureFlags = {};
    // this.renderer = undefined;
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

  detectFlagChange(old, curr) {
    return JSON.stringify(old) !== JSON.stringify(curr);
  }

  async poll() {
    const prevFlags = this.featureFlags;
    const res = await axios.get(`${this.config.api_address}/api/flags?sdk_key=${this.config.sdkKey}`);
    res.data.forEach(flag => {
      this.featureFlags[flag.name] = flag;
    });
    if (!prevFlags || this.detectFlagChange(prevFlags, this.featureFlags)) {
      this.render();
    }
  }

  // defaultVal is a boolean
  evaluateFlag(featureName, defaultVal) {
    const featureData = this.featureFlags[featureName];

    if (featureData === undefined) {
      if (defaultVal ===  undefined) {
        throw new TypeError("Must supply a default value argument");
      }
      console.log("Feature flag not found");
      return defaultVal;
    }

    if (this.context === undefined || featureData.status === false) {
      return featureData.status;
    }

    return userInRollout(this.context.userId, featureData['percentage_split']);
  }

  setFeatureFlags(featureFlags) {
    this.featureFlags = featureFlags;
  }
  // render() {
  //   if (this.renderer) {
  //     this.renderer();
  //   }
  // }

  // setRenderer(renderer) {
  //   this.renderer = renderer;
  // }

}

module.exports = Client;