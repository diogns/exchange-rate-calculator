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

  static get userTable() {
    return {
      name: `notification-user-table-${this.stack}`,
      attributes: [
        {
          name: 'userName',
          type: 'S', // string
        },
        {
          name: 'notificationId',
          type: 'S', // string
        },
        {
          name: 'userNameAndDisplayStatus',
          type: 'S',
        },
      ],
      billingMode: 'PAY_PER_REQUEST',
      hashKey: 'userName',
      rangeKey: 'notificationId',
      ttl: {
        attributeName: 'exp',
        enabled: true,
      },
      globalSecondaryIndexes: [
        {
          hashKey: 'userNameAndDisplayStatus',
          rangeKey: 'notificationId',
          name: 'userNameAndDisplayStatusIndex',
          projectionType: 'ALL',
        },
      ],
    };
  }

  static get userGroupTable() {
    return {
      name: `notification-user-group-table-${this.stack}`,
      attributes: [
        {
          name: 'userName',
          type: this.attributeDataType.String,
        },
        {
          name: 'userGroup',
          type: this.attributeDataType.String,
        },
      ],
      billingMode: 'PAY_PER_REQUEST',
      hashKey: 'userGroup',
      rangeKey: 'userName',
      ttl: {
        attributeName: 'exp',
        enabled: true,
      },
      // globalSecondaryIndexes: [
      //   {
      //     hashKey: "userNameAndDisplayStatus",
      //     rangeKey: "notificationId",
      //     name: "userNameAndDisplayStatusIndex",
      //     projectionType: "ALL",
      //   },
      // ]
    };
  }

  static get notificationTable() {
    return {
      name: `notification-table-${this.stack}`,
      attributes: [
        {
          name: 'id',
          type: this.attributeDataType.String,
        },
        {
          name: 'userGroup',
          type: this.attributeDataType.String,
        },
      ],
      billingMode: 'PAY_PER_REQUEST',
      hashKey: 'userGroup',
      ttl: {
        attributeName: 'exp',
        enabled: true,
      },
      rangeKey: 'id',
    };
  }

  static get websocketConnectionTable() {
    return {
      name: `notification-websocket-connection-table-${this.stack}`,
      attributes: [
        {
          name: 'connectionId',
          type: this.attributeDataType.String,
        },
        {
          name: 'userGroup',
          type: this.attributeDataType.String,
        },
      ],
      billingMode: 'PAY_PER_REQUEST',
      hashKey: 'userGroup',
      ttl: {
        attributeName: 'exp',
        enabled: true,
      },
      rangeKey: 'connectionId',
      globalSecondaryIndexes: [
        {
          hashKey: 'connectionId',
          name: 'connectionIdIndex',
          projectionType: 'ALL',
        },
      ],
    };
  }

  static get webpushConnectionTable() {
    return {
      name: `notification-webpush-connection-table-${this.stack}`,
      attributes: [
        {
          name: 'publicKey',
          type: this.attributeDataType.String,
        },
        {
          name: 'userGroup',
          type: this.attributeDataType.String,
        },
      ],
      billingMode: 'PAY_PER_REQUEST',
      hashKey: 'userGroup',
      ttl: {
        attributeName: 'exp',
        enabled: true,
      },
      rangeKey: 'publicKey',
      globalSecondaryIndexes: [
        {
          hashKey: 'publicKey',
          name: 'publicKeyIndex',
          projectionType: 'ALL',
        },
      ],
    };
  }
}
