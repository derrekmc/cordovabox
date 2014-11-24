#!/bin/bash

# halt on first error
set -e

echo cleaning up
rm -fR node_modules
rm -fR lib/hash/node_modules
rm -fR lib/gatewayCommunicationHelper/node_modules

cd lib/hash
echo building... lib/hash
npm install 2>/dev/null > /dev/null

echo building... lib/gatewayCommunicationHelper
npm install 2>/dev/null > /dev/null

cd ../..

echo building.. dependencies for server.js
npm install lib/gatewayCommunicationHelper 2>/dev/null > /dev/null

echo building... main app
npm install 2>/dev/null > /dev/null

echo [DONE]
