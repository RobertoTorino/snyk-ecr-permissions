import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { env } from '../bin';
import { SnykEcrPipelineStack } from '../lib/snyk-ecr-pipeline-stack';

const app = new cdk.App();
test('Matches SnapShot', () => {
  new SnykEcrPipelineStack(app, 'SnykEcrPipelineStack', {
    description: 'pipeline stack for a policy to give Snyk ecr permissions',
    env,
  });
  const testStackOutput = app.synth().getStackArtifact('SnykEcrPipelineStack').template;

  expect(Template.fromJSON(testStackOutput)).toMatchSnapshot();
});
