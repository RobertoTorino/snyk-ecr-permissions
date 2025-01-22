#!/bin/bash

# Quickly make extended diagram
# Find your stacks with 'cdk ls' and use the ones you want to have a diagram from

DIAGRAM1=SnykEcrPipelineStack
DIAGRAM2=SnykEcrPipelineStack/SnykEcrPermissionsStage/SnykEcrPermissionsStack

PNG1=SnykEcrPipelineStack-ext
PNG2=SnykEcrPermissionsStack-ext

cd .. || exit
npm i cdk-dia@latest
cdk synth -q && \
npx cdk-dia --collapse false --include $DIAGRAM1 --target-path $PNG1.png && \
npx cdk-dia --collapse false --include $DIAGRAM2 --target-path $PNG2.png
rm -rf -- *.dot
mv -f -- *.png images/ && npm r cdk-dia
