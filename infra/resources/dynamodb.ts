import * as aws from '@pulumi/aws';

import { getTags } from './tags';

import { Constants } from './constants';

const tags = getTags();

export function createUserTable() {
  // const name = Constants.userTable.name;
  const name = 'user-table-dev';
  const table = new aws.dynamodb.Table(
    name,
    {
      name,
      attributes: [
        {
          name: 'userName',
          type: 'S', // string
        },
        {
          name: 'idNotification',
          type: 'N', // number
        },
        {
          name: 'status',
          type: 'N',
        },
      ],
      billingMode: Constants.userTable.billingMode,
      hashKey: Constants.userTable.hashKey,
      tags,
    },
    // { provider }
  );

  return table;
}

/*
export function createUserGroupTable() {
  const name = Constants.userGroupTable.name;

  const table = new aws.dynamodb.Table(
    name,
    {
      name,
      attributes: Constants.userGroupTable.attributes,
      billingMode: Constants.userGroupTable.billingMode,
      hashKey: Constants.userGroupTable.hashKey,
      //rangeKey: Constants.userGroupTable.rangeKey,
      //globalSecondaryIndexes: Constants.userGroupTable.globalSecondaryIndexes,
      tags,
    },
    { provider }
  );

  return table;
}
*/
