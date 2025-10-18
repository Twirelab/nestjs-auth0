#!/usr/bin/env node

const semver = require('semver');
const { version } = process;

const requiredVersion = '^20.19.0';

if (!semver.satisfies(version, requiredVersion)) {
  console.error(`
❌ Node.js version check failed!

Current version: ${version}
Required version: ${requiredVersion}

Please upgrade your Node.js version to ${requiredVersion} or higher.
You can download the latest version from: https://nodejs.org/
`);
  process.exit(1);
}

console.log(`✅ Node.js version check passed! (${version})`);
