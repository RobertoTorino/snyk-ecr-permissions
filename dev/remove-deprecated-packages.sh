#!/bin/bash

echo "Uninstall deprecated NPM packages"
# This module is not supported, and leaks memory.
npm r inflight@1.0.6

# deprecated
npm r boolean@3.2.0
npm r glob@7.2.3
