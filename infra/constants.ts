import * as pulumi from '@pulumi/pulumi';

export default class Constants {
  private static config: { [key: string]: pulumi.Config } = {};

  private static getConfig(configName: string): pulumi.Config {
    if (!this.config[configName]) {
      this.config[configName] = new pulumi.Config(configName);
    }

    return this.config[configName];
  }

  static get apiGatewayStageUrlCore() {
    return this.getConfig('api').require('apigateway-stage-url-core');
  }

  static get cognitoUserPoolId() {
    return this.getConfig('cognito').require('user-pool-id');
  }

  static get cognitoClientId() {
    return this.getConfig('cognito').require('client-id');
  }
}
