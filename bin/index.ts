#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';
import { SnykEcrPipelineStack } from '../lib/snyk-ecr-pipeline-stack';

const app = new cdk.App();
export const application = 'SnykEcr';
export const env = {
  account: process.env.CDK_SYNTH_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_SYNTH_REGION || process.env.CDK_DEFAULT_REGION,
};

export const snykEcrPipelineStack = new SnykEcrPipelineStack(app, 'SnykEcrPipelineStack', {
  description: 'pipeline stack for a policy to give Snyk ecr permissions',
  env,
});
Tags.of(snykEcrPipelineStack).add('Stage', 'prod');
Tags.of(snykEcrPipelineStack).add('Application', 'application');

// Show the actual AWS account id and region
console.log(`\x1B[1;34mAWS region: ${env.region}`);
console.log(`\x1B[1;34mAWS account-id: ${env.account}`);

const { exec } = require('child_process');

exec(
  'aws iam list-account-aliases --query AccountAliases --output text || exit',
  (
    error: { message: any; },
    stdout: any,
  ) => {
    (`${stdout.trimEnd}`);
    const myAccountAlias = (`${stdout.trimEnd()}`);
    console.log(`\x1B[1;34mAWS account-alias: ${myAccountAlias.toUpperCase()}`);

    exec(
      'aws codestar-connections list-connections --query "Connections[].ConnectionArn" --output text',
      (
        error: { message: any; },
        stdout: any,
      ) => {
        (`${stdout.trimEnd}`);
        const myCodeStarArn = (`${stdout.trimEnd()}`);
        console.log(`\x1B[1;34mAWS codestar-arn: ${myCodeStarArn}`);
      },
    );

    exec(
      'basename -s .git $(git remote get-url origin)',
      (
        error: { message: any; },
        stdout: any,
      ) => {
        (`${stdout.trimEnd}`);
        const myBranch = (`${stdout.trimEnd()}`);
        console.log(`CURRENT BRANCH: ${myBranch}`);
      },
    );
  },
);
