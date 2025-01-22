import { App } from 'aws-cdk-lib';
import { env } from '../bin';
import { SnykEcrPipelineStack } from '../lib/snyk-ecr-pipeline-stack';

describe('Synthesize tests', () => {
  const app = new App();

  test('Creates the stack without exceptions', () => {
    expect(() => {
      new SnykEcrPipelineStack(app, 'SnykEcrPermissionsStack', {
        description: 'Pipeline stack for a policy to give Snyk AWS ECR permissions',
        env,
      });
    }).not.toThrow();
  });

  test('This app can synthesize completely', () => {
    expect(() => {
      app.synth();
    }).not.toThrow();
  });
});
