import { Stage, StageProps, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { env } from '../bin';
import { SnykEcrPermissionsStack } from './snyk-ecr-permissions-stack';

export class SnykEcrPermissionsStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const snykEcrPermissionsStack = new SnykEcrPermissionsStack(this, 'SnykEcrPermissionsStack', {
      description: 'Pipeline stack for a policy to give Snyk AWS ECR permissions',
      env,
    });
    Tags.of(snykEcrPermissionsStack).add('Stage', 'prod');
    Tags.of(snykEcrPermissionsStack).add('Application', 'cnca-snyk-policy');
  }
}
