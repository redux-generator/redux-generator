#!/usr/bin/env node

const clear = require('clear');
const path = require('path');

const inquirer = require('./lib/inquirer');
const { manager } = require('./lib/init-manager');
const { entityManager } = require('./lib/init-entity-manager');
const {
  successMessageInConsole,
  helpMessageInConsole,
  errorMessageInConsole,
} = require('./lib/utils');

const {
  defaultStoreFolder,
  defaultSagaFolder,
  defaultSagaFolderEntity,
  defaultStoreFolderEntity,
} = require('./lib/constants');

const runScript = async (argv) => {
  const command = argv[0];
  switch (command) {
    case 'init-redux':
      const rs_folder = await inquirer.askFolderNameForReduxStore(
        defaultStoreFolder,
      );
      const init_saga = await inquirer.askIncludeSaga(defaultSagaFolder);

      const init_dirs = await manager({ ...rs_folder, ...init_saga });

      clear();
      successMessageInConsole(init_dirs, command);
      break;
    case 'init-entity':
      const entity_name = await inquirer.askEntityName();
      const crud = await inquirer.askCRUD();
      const rs_entity_folder = await inquirer.askFolderNameForReduxStore(
        defaultStoreFolderEntity,
      );
      const sagas = await inquirer.askIncludeSaga(defaultSagaFolderEntity);

      const entity_dirs = await entityManager({
        ...entity_name,
        ...crud,
        ...rs_entity_folder,
        ...sagas,
      });

      clear();
      successMessageInConsole(entity_dirs, command);
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
