import * as aws from '@pulumi/aws';

import { getProvider } from './provider';
import { getTags } from './tags';

import { Constants } from './constants';

const provider = getProvider();
const tags = getTags();

export function createPairTable() {
  const name = Constants.pairTable.name;

  const table = new aws.dynamodb.Table(
    name,
    {
      name,
      attributes: Constants.pairTable.attributes,
      billingMode: Constants.pairTable.billingMode,
      hashKey: Constants.pairTable.hashKey,
      // rangeKey: Constants.userTable.rangeKey,
      ttl: Constants.userTable.ttl,
      // globalSecondaryIndexes: Constants.userTable.globalSecondaryIndexes,
      tags,
    },
    { provider },
  );

  return table;
}

export function createUserTable() {
  const name = Constants.userTable.name;

  const table = new aws.dynamodb.Table(
    name,
    {
      name,
      attributes: Constants.userTable.attributes,
      billingMode: Constants.userTable.billingMode,
      hashKey: Constants.userTable.hashKey,
      // rangeKey: Constants.userTable.rangeKey,
      ttl: Constants.userTable.ttl,
      // globalSecondaryIndexes: Constants.userTable.globalSecondaryIndexes,
      tags,
    },
    { provider },
  );

  return table;
}
