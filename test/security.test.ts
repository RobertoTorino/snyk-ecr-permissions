import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { env } from '../bin';
import { SnykEcrPipelineStack } from '../lib/snyk-ecr-pipeline-stack';

const mutationPermissions = [
  'iam:DeleteRole',
  'iam:ChangePassword',
  'iam:CreateUser',
  'iam:CreateRole',
  'iam:AddRoleToInstanceProfile',
  'iam:AttachRolePolicy',
  'iam:AttachUserPolicy',
  'iam:AttachGroupPolicy',
  'iam:UpdateGroup',
  'iam:RemoveUserFromGroup',
];

describe('IAM tests', () => {
  const app = new cdk.App();
  const snykEcrPipelineStack = new SnykEcrPipelineStack(app, 'SnykEcrPipelineStack', {
    description: 'pipeline stack for a policy to give Snyk ecr permissions',
    env,
  });
  const assert = Template.fromJSON(app.synth().getStackArtifact(snykEcrPipelineStack.artifactId).template);

  describe('IAM mutation', () => {
    mutationPermissions.forEach((permission) => {
      test(`Does not have any IAM policy statements including ${permission}`, () => {
        const arrayMatches = assert.findResources('AWS::IAM::Policy', {
          Properties: {
            PolicyDocument: {
              Statement: Match.arrayWith([Match.objectLike({
                Action: permission,
                Effect: 'Allow',
              })]),
            },
          },
        });
        expect(Object.keys(arrayMatches).length).toBe(0);

        const directMatches = assert.findResources('AWS::IAM::Policy', {
          PolicyDocument: {
            Statement: Match.arrayWith([Match.objectLike({
              Action: permission,
              Effect: 'Allow',
            })]),
          },
        });
        expect(Object.keys(directMatches).length).toBe(0);
      });
    });
  });
});
