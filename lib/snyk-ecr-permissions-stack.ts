import {
  RemovalPolicy, Stack, StackProps,
} from 'aws-cdk-lib';
import {
  ArnPrincipal, Effect, PolicyStatement, Role,
} from 'aws-cdk-lib/aws-iam';
import { ParameterValueType, StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { env } from '../bin';

export class SnykEcrPermissionsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const snykExternalId = StringParameter.valueForTypedStringParameterV2(this, 'snyk-external-id', ParameterValueType.STRING, 1);

    const snykServiceRole = new Role(this, 'SnykServiceRole', {
      description: 'Provides Snyk with read-only access to AWS EC2 Container Registry repositories',
      roleName: 'SnykServiceRole',
      assumedBy: new ArnPrincipal(`arn:aws:iam::${env.account}:user/ecr-integration-user`),
    });
    snykServiceRole.applyRemovalPolicy(RemovalPolicy.DESTROY);

    snykServiceRole.addToPolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['sts:AssumeRole'],
      resources: ['*'],
      conditions: {
        StringEquals: {
          'sts:ExternalId': snykExternalId,
        },
      },
    }));
    snykServiceRole.applyRemovalPolicy(RemovalPolicy.DESTROY);

    snykServiceRole.addToPolicy(new PolicyStatement({
      sid: 'SnykAllowPull',
      effect: Effect.ALLOW,
      actions: [
        'ecr:GetLifecyclePolicyPreview',
        'ecr:GetDownloadUrlForLayer',
        'ecr:BatchGetImage',
        'ecr:DescribeImages',
        'ecr:GetAuthorizationToken',
        'ecr:DescribeRepositories',
        'ecr:ListTagsForResource',
        'ecr:ListImages',
        'ecr:BatchCheckLayerAvailability',
        'ecr:GetRepositoryPolicy',
        'ecr:GetLifecyclePolicy',
      ],
      resources: ['*'],
    }));
    snykServiceRole.applyRemovalPolicy(RemovalPolicy.DESTROY);
  }
}
