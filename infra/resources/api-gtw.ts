import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

import { getProvider } from './provider';
import { getTags } from './tags';
import { CreateVpcLinkSecurityGroup } from './security-groups';

const project = pulumi.getProject();
const stack = pulumi.getStack();

const awsConfig = new pulumi.Config('aws');
//const apiConfig = new pulumi.Config('api');

//const audience = apiConfig.require('audience');
//const issuerUrl = apiConfig.require('issuerUrl');

const privateSubnets = awsConfig.require('privateSubnets');

const provider = getProvider();
const tags = getTags();

export function CreateApiGateway(
  listenerArn: pulumi.Output<string>,
): aws.apigatewayv2.Api {
  const apiGateway = new aws.apigatewayv2.Api(
    'httpApiGateway',
    {
      name: `app-${project}-api-gateway-http`,
      protocolType: 'HTTP',
      tags,
    },
    { provider },
  );

  const securityGroup = CreateVpcLinkSecurityGroup();

  const vpcLink = new aws.apigatewayv2.VpcLink(
    'vpcLink',
    {
      name: `app-${project}-vpc-link`,
      securityGroupIds: [securityGroup.id],
      subnetIds: privateSubnets.split(','),
      tags,
    },
    { provider },
  );

  const apiIntegration = new aws.apigatewayv2.Integration(
    'vpcLinkIntegration',
    {
      apiId: apiGateway.id,
      integrationType: 'HTTP_PROXY',
      integrationUri: listenerArn,
      integrationMethod: 'ANY',
      connectionType: 'VPC_LINK',
      connectionId: vpcLink.id,
    },
    { provider, dependsOn: [vpcLink, apiGateway] },
  );

  const apiRouteArgs = {
    apiId: apiGateway.id,
    routeKey: 'ANY /{proxy+}',
    target: pulumi.interpolate`integrations/${apiIntegration.id}`,
  };

  const apiRouteDepends: any = [apiIntegration, apiGateway];

  //if (audience != '' && issuerUrl != '') {
  //  const apiAuthorizer = new aws.apigatewayv2.Authorizer(
  //    'apiAuthorizer',
  //    {
  //      apiId: apiGateway.id,
  //      name: `app-${project}-jwt-cognito-authorization`,
  //      authorizerType: 'JWT',
  //      identitySources: ['$request.header.Authorization'],
  //      jwtConfiguration: {
  //        audiences: audience.split(','),
  //        issuer: issuerUrl,
  //      },
  //    },
  //    { provider },
  //  );

  //  const authorizerParams = {
  //    authorizerId: apiAuthorizer.id,
  //    authorizationType: 'JWT',
  //  };

  //  apiRouteArgs = { ...apiRouteArgs, ...authorizerParams };
  //  apiRouteDepends.push(apiAuthorizer);
  //}

  new aws.apigatewayv2.Route('apiRoute', apiRouteArgs, {
    provider,
    dependsOn: apiRouteDepends,
  });

  const logGroup = new aws.cloudwatch.LogGroup(
    'apiGatewayLogGroup',
    {
      name: `app-${project}-api-gateway-log-${stack}`,
      retentionInDays: 14,
      tags,
    },
    { provider },
  );

  const accessLogFormat = JSON.stringify({
    requestId: '$context.requestId',
    ip: '$context.identity.sourceIp',
    caller: '$context.identity.caller',
    user: '$context.identity.user',
    requestTime: '$context.requestTime',
    httpMethod: '$context.httpMethod',
    resourcePath: '$context.resourcePath',
    status: '$context.status',
    protocol: '$context.protocol',
    responseLength: '$context.responseLength',
  });

  new aws.apigatewayv2.Stage(
    'apiStage',
    {
      apiId: apiGateway.id,
      name: '$default',
      autoDeploy: true,
      defaultRouteSettings: {
        detailedMetricsEnabled: true,
        throttlingBurstLimit: 5000,
        throttlingRateLimit: 10000,
      },
      accessLogSettings: {
        destinationArn: logGroup.arn,
        format: accessLogFormat,
      },
    },
    { provider, dependsOn: [apiGateway] },
  );

  return apiGateway;
}
