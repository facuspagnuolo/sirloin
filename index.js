#!/usr/bin/env node
require('babel-register');
require('babel-polyfill');

const program = require('commander');
const Console = require("./src/console");
const Configuration = require('./src/configuration/configuration')
const ProjectCompiler = require('./src/compiler/project-compiler')

program
  .command('compile')
  .description('Compile a solidity project')
  .action(function() {
    const settings = Configuration.solcSettings()
    new ProjectCompiler(settings).call()
  });

program
  .command('console')
  .description('Open a node console within Sirloin context')
  .option("-n, --network [network]", "Tell the network config to use")
  .action(function(options) {
    global.network = options.network
    const settings = Configuration.solcSettings()
    new ProjectCompiler(settings).call()
    new Console(settings.output).start()
  });

program
  .command('exec')
  .description('Execute a JS script within Sirloin context')
  .action(function() {
    throw Error('Pending...')
  });

program
  .command('init')
  .description('Initialize Sirloin example configuration')
  .action(function() {
    throw Error('Pending...')
  });

program.parse(process.argv);
