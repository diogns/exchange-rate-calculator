import { CreateTargetGroup } from './resources/alb';
import { CreateEcr } from './resources/ecr';
import { CreateFargate } from './resources/fargate';
import { GetImageName } from './resources/helpers';
import { CreateApiGateway } from './resources/api-gtw';

const [targetGroup, listenerHttp] = CreateTargetGroup();
const repositoryUrl = CreateEcr();
const imageName = GetImageName(repositoryUrl);

const [cluster, taskDefinition, service] = CreateFargate(
  targetGroup,
  imageName,
);

const apigtw = CreateApiGateway(listenerHttp.arn);

export const apiEcrUrl = repositoryUrl;
export const taskDefinitionArn = taskDefinition.arn;
export const serviceName = service.name;
export const ecsClusterArn = cluster.arn;
export const apiUri = apigtw.apiEndpoint;

import {
  createUserTable,
  createUserGroupTable,
  createNotificationTable,
  createWebsocketConnectionTable,
  createWebpushConnectionTable,
} from './resources/dynamodb';

const userTable = createUserTable();
const userGroupTable = createUserGroupTable();
const notificationTable = createNotificationTable();
const websocketConnectionTable = createWebsocketConnectionTable();
const webpushConnectionTable = createWebpushConnectionTable();

export const userTableArn = userTable.arn;
export const userGroupTableArn = userGroupTable.arn;
export const notificationTableArn = notificationTable.arn;
export const websocketConnectionTableArn = websocketConnectionTable.arn;
export const webpushConnectionTableArn = webpushConnectionTable.arn;
