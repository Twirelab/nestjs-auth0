#!/usr/bin/env node

const semver = require("semver");
const { version } = process;

const minimumVersion = "20.19.0";
const requiredVersion = `>=${minimumVersion}`;

if (!semver.satisfies(version, requiredVersion)) {
  console.error(`
❌ Node.js version check failed!

Current version: ${version}
Minimum required version: ${minimumVersion}

This package requires Node.js version ${minimumVersion} or higher.
Please upgrade your Node.js version.
You can download the latest version from: https://nodejs.org/
`);
  process.exit(1);
}

console.log(
  `✅ Node.js version check passed! (${version} - minimum required: ${minimumVersion})`
);
