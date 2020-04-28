#!/usr/bin/env node

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
require('dotenv').config();
const clear = require('clear');

const { INIT_ENTITY, INIT_REDUX } = require('./lib/constants');

const { helpMessageInConsole, errorMessageInConsole } = require('./lib/utils');

const { initRedux } = require('./lib/controllers/init-redux');
const { initReduxEntity } = require('./lib/controllers/init-redux-entity');

const runScript = async (argv) => {
  // const l = ['redux', 'react-redux', 'redux-saga'].map(async (el) => {
  //   const { stdout, stderr } = await exec(`npm view ${el} version`);
  //   return stdout;
  // });
  // // console.log('stdout:', stdout);
  // const lol = await Promise.all(l);
  // console.log('stderr:', lol);

  console.log('argv', argv);
  console.log('isDev', process.env.NODE_ENV);
  const command = argv[0];
  switch (command) {
    case INIT_REDUX:
      await initRedux(INIT_REDUX);
      break;
    case INIT_ENTITY:
      await initReduxEntity(INIT_ENTITY);
      break;

    case 'help': {
      helpMessageInConsole();
      break;
    }
    default: {
      errorMessageInConsole();
    }
  }
};

clear();
runScript(process.argv.slice(2));
