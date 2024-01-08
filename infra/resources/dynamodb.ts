import * as aws from '@pulumi/aws';

import { getProvider } from './provider';
import { getTags } from './tags';

import { Constants } from './constants';

const provider = getProvider();
const tags = getTags();

export function createUserTable() {
  const name = Constants.userTable.name;

  const table = new aws.dynamodb.Table(
    name,
    {
      name,
      attributes: Constants.userTable.attributes,
      billingMode: Constants.userTable.billingMode,
      hashKey: Constants.userTable.hashKey,
      rangeKey: Constants.userTable.rangeKey,
      ttl: Constants.userTable.ttl,
      globalSecondaryIndexes: Constants.userTable.globalSecondaryIndexes,
      tags,
    },
    { provider },
  );

  return table;
}

export function createUserGroupTable() {
  const name = Constants.userGroupTable.name;

  const table = new aws.dynamodb.Table(
    name,
    {
      name,
      attributes: Constants.userGroupTable.attributes,
      billingMode: Constants.userGroupTable.billingMode,
      hashKey: Constants.userGroupTable.hashKey,
      rangeKey: Constants.userGroupTable.rangeKey,
      ttl: Constants.userGroupTable.ttl,
      // globalSecondaryIndexes: Constants.userGroupTable.globalSecondaryIndexes,
      tags,
    },
    { provider },
  );

  return table;
}

export function createNotificationTable() {
  const name = Constants.notificationTable.name;
  const table = new aws.dynamodb.Table(
    name,
    {
      name,
      attributes: Constants.notificationTable.attributes,
      billingMode: Constants.notificationTable.billingMode,
      hashKey: Constants.notificationTable.hashKey,
      rangeKey: Constants.notificationTable.rangeKey,
      //globalSecondaryIndexes: Constants.notificationTable.globalSecondaryIndexes,
      ttl: Constants.notificationTable.ttl,
      tags,
    },
    { provider },
  );

  return table;
}

export function createWebsocketConnectionTable() {
  const name = Constants.websocketConnectionTable.name;

  const table = new aws.dynamodb.Table(
    name,
    {
      name,
      attributes: Constants.websocketConnectionTable.attributes,
      billingMode: Constants.websocketConnectionTable.billingMode,
      hashKey: Constants.websocketConnectionTable.hashKey,
      rangeKey: Constants.websocketConnectionTable.rangeKey,
      globalSecondaryIndexes:
        Constants.websocketConnectionTable.globalSecondaryIndexes,
      ttl: Constants.websocketConnectionTable.ttl,
      tags,
    },
    { provider },
  );

  return table;
}

export function createWebpushConnectionTable() {
  const name = Constants.webpushConnectionTable.name;

  const table = new aws.dynamodb.Table(
    name,
    {
      name,
      attributes: Constants.webpushConnectionTable.attributes,
      billingMode: Constants.webpushConnectionTable.billingMode,
      hashKey: Constants.webpushConnectionTable.hashKey,
      rangeKey: Constants.webpushConnectionTable.rangeKey,
      globalSecondaryIndexes:
        Constants.webpushConnectionTable.globalSecondaryIndexes,
      ttl: Constants.webpushConnectionTable.ttl,
      tags,
    },
    { provider },
  );

  return table;
}
