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
      name: `user-table-${this.stack}`,
      attributes: [
        {
          name: 'userName',
          type: this.attributeDataType.String,
        },
        //{
        //  name: 'email',
        //  type: this.attributeDataType.String,
        //},
        //{
        //  name: 'firstName',
        //  type: this.attributeDataType.String,
        //},
        //{
        //  name: 'lastName',
        //  type: this.attributeDataType.String,
        //},
        //{
        //  name: 'groups',
        //  type: this.attributeDataType.StringSet,
        //},
        //{
        //  name: 'status',
        //  type: this.attributeDataType.Number,
        //},
      ],
      billingMode: 'PAY_PER_REQUEST',
      hashKey: 'userName',
    };
  }

  static get userGroupTable() {
    return {
      name: `user-group-table-${this.stack}`,
      attributes: [
        {
          name: 'group',
          type: this.attributeDataType.String,
        },
        //{
        //  name: 'app',
        //  type: this.attributeDataType.String,
        //},
        //{
        //  name: 'permissions',
        //  type: this.attributeDataType.String,
        //},
        //{
        //  name: 'options',
        //  type: this.attributeDataType.String,
        //},
        //{
        //  name: 'status',
        //  type: this.attributeDataType.Number,
        //},
      ],
      billingMode: 'PAY_PER_REQUEST',
      hashKey: 'group',
      //rangeKey: 'app',
      //globalSecondaryIndexes: [
      //  {
      //    hashKey: "ruc",
      //    rangeKey: "dateStart",
      //    name: "rucDateStartIndex",
      //    projectionType: "ALL",
      //  },
      //]
    };
  }
}
