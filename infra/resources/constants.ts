import * as pulumi from '@pulumi/pulumi';

export class Constants {
  private static config: { [key: string]: pulumi.Config } = {};

  private static getConfig(configName: string): pulumi.Config {
    if (!this.config[configName])
      this.config[configName] = new pulumi.Config(configName);

    return this.config[configName];
  }

  static get stack() {
    return pulumi.getStack();
  }

  static get region() {
    return this.getConfig('aws').require('region');
  }

  static get attributeDataType() {
    return {
      String: 'S',
      Number: 'N',
      Binary: 'B',
      //Boolean: 'BOOL',
      //Null: 'NULL',
      //Map: 'M',
      //List: 'L',
      //StringSet: 'SS',
      //NumberSet: 'NS',
      //BinarySet: 'BS',
    };
  }

  static get pairTable() {
    return {
      name: `exchage-rate-calculator-pair-table-${this.stack}`,
      attributes: [
        {
          name: 'pair',
          type: 'S', // string
        },
        // {
        //   name: 'value',
        //   type: 'N', // string
        // },
      ],
      billingMode: 'PAY_PER_REQUEST',
      hashKey: 'pair',
      // rangeKey: 'notificationId',
      ttl: {
        attributeName: 'exp',
        enabled: true,
      },
      // globalSecondaryIndexes: [
      //   {
      //     hashKey: 'userNameAndDisplayStatus',
      //     rangeKey: 'notificationId',
      //     name: 'userNameAndDisplayStatusIndex',
      //     projectionType: 'ALL',
      //   },
      // ],
    };
  }

  static get userTable() {
    return {
      name: `exchage-rate-calculator-user-table-${this.stack}`,
      attributes: [
        {
          name: 'user',
          type: 'S', // string
        },
        //{
        //  name: 'value',
        //  type: 'N', // string
        //},
      ],
      billingMode: 'PAY_PER_REQUEST',
      hashKey: 'user',
      // rangeKey: 'notificationId',
      ttl: {
        attributeName: 'exp',
        enabled: true,
      },
      // globalSecondaryIndexes: [
      //   {
      //     hashKey: 'userNameAndDisplayStatus',
      //     rangeKey: 'notificationId',
      //     name: 'userNameAndDisplayStatusIndex',
      //     projectionType: 'ALL',
      //   },
      // ],
    };
  }
}
