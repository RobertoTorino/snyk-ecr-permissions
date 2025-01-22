#!/bin/sh
# Quickly create an AWS CDK App.
# Set the terminal you use here: bash or zsh or another.
# Installs the latest AWS CDK. Only tested on macOS.
export TERM=xterm-256color

YELLOW='\033[1;33m'
CDK="CREATE_CDK_APP_EXAMPLE"
DATE=$( date "+%d-%m-%YT%H:%M:%S" )
DIR="cdk-app-example"
echo "$YELLOW"

select cdk in $CDK; do
case $cdk in
"CREATE_CDK_APP_EXAMPLE")

echo "Date/time: $DATE"
cd || exit
# if dir does not exists create it
if
  [ ! -d "$DIR" ]
then
  mkdir -p "$DIR" && chmod -R 755 "$DIR"
else
	rm -rvf "$DIR"
  mkdir -p "$DIR" && chmod -R 755 "$DIR"
  echo "Removed old files"
fi

echo "Directory [ $DIR ] is created!"
cd "$DIR" || exit
 if command aws-cdk version &> /dev/null; then
     echo "⚠️""$YELLOW""CDK is already installed: $(cdk version)"
        echo "checking and installing update: $(npm i -g aws-cdk@latest)"
 	        echo "CDK installed successfully. ✨ ✨ "
 	            echo "Using AWS CDK: $(cdk version)"
 else
     echo "$YELLOW""Installing CDK: $(npm i -g aws-cdk@latest)"
         echo "Using AWS CDK: $(cdk version)"

if command -v cdk &> /dev/null; then
    echo "CDK installed successfully. ✨ ✨ "
    echo "Using AWS CDK: $(cdk version)"
else
    echo "Error: CDK installation failed."
    exit 1
fi
 fi

echo
break
;;
*)
echo "Error! Please check your logs."
;;
esac
done

echo "$YELLOW""Initializing app, using Typescript"
cdk init app --language typescript

echo "$YELLOW""Uninstall deprecated packages"
npm uninstall inflight@1.0.6
npm uninstall boolean@3.2.0
npm uninstall glob@7.2.3

echo "$YELLOW""Add and commit changes to git"
git add .
git commit -m "First commit for the example-cdk-app repository."
git log

echo "$YELLOW""List the stack(s)"
cdk ls

open .
