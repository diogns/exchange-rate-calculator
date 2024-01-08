/*
import { CreateTargetPair } from './resources/alb';
import { CreateEcr } from './resources/ecr';
import { CreateFargate } from './resources/fargate';
import { GetImageName } from './resources/helpers';
import { CreateApiGateway } from './resources/api-gtw';

const [targetPair, listenerHttp] = CreateTargetPair();
const repositoryUrl = CreateEcr();
const imageName = GetImageName(repositoryUrl);

const [cluster, taskDefinition, service] = CreateFargate(
  targetPair,
  imageName,
);

const apigtw = CreateApiGateway(listenerHttp.arn);

export const apiEcrUrl = repositoryUrl;
export const taskDefinitionArn = taskDefinition.arn;
export const serviceName = service.name;
export const ecsClusterArn = cluster.arn;
export const apiUri = apigtw.apiEndpoint;
*/
import { createUserTable, createPairTable } from './resources/dynamodb';

const userTable = createUserTable();
const userPairTable = createPairTable();

export const userTableArn = userTable.arn;
export const userPairTableArn = userPairTable.arn;
