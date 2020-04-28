#!/usr/bin/env node

require('dotenv').config();
const clear = require('clear');
const path = require('path');

const { INIT_ENTITY, INIT_REDUX } = require('./lib/constants');

const { helpMessageInConsole, errorMessageInConsole } = require('./lib/utils');

const { initRedux } = require('./lib/controllers/init-redux');
const { initReduxEntity } = require('./lib/controllers/init-redux-entity');

const runScript = async (argv) => {
  console.log('argv', argv);
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
