const clear = require('clear');
// const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const inquirer = require('../utils/inquirer');
const {
  getOutputPath,
  checkNestedPath,
  successMessageInConsole,
} = require('../utils');
const {
  createIfNotExist,
  directoryExists,
  writeOrRewrite,
} = require('../utils/files');
const { defaultStoreFolder, TS_FLAGS } = require('../constants');

const { filesArray } = require('../files/init-redux');
const { TEMPLATE, ENTITY_NAME } = require('../utils/redux-init-info');

const manager = async ({ reduxStoreFolderName, saga, ts }) => {
  const isDev = process.env.NODE_ENV === 'development';
  // check path for redux
  checkNestedPath(reduxStoreFolderName);

  return filesArray
    .filter((el) => {
      if (!el.dependOn) return true;
      if (el.dependOn.ts && ts) return true;
      if (el.dependOn.saga && saga) return true;
      return false;
    })
    .map((file) => {
      const { fullPath, dir /* ...rest */ } = getOutputPath(
        file.outputPath,
        reduxStoreFolderName,
      );

      createIfNotExist(dir);

      const toRender = isDev ? fs.readFileSync(file.templatePath, 'utf8') : file.json;
      const pathWithExtension = `${fullPath}${ts ? '.ts' : '.js'}`;

      // generate join files
      // fs.writeFileSync(
      //   `${dir}/${rest.name}.json`,
      //   JSON.stringify({ data: templateContents }),
      //   { flag: 'wx' },
      // );

      const content = ejs.render(toRender, {
        worker: TEMPLATE,
        options: {
          mainType: 'AUTH',
          entityActionTypes: 'AuthActionTypes',
          singleEntityLowerCase: ENTITY_NAME.toLowerCase(),
          saga,
          ts,
        },
      });

      const fileExist = directoryExists(pathWithExtension);
      return writeOrRewrite(fileExist, pathWithExtension, content);
    });
};

module.exports = {
  initRedux: async (argv) => {
    const command = argv[0];
    const ts = argv.some((el) => TS_FLAGS.find((e) => e === el));
    const rsFolder = await inquirer.askFolderNameForReduxStore(
      defaultStoreFolder,
    );
    const initSaga = await inquirer.askIncludeSagaFile();

    const initDirs = await manager({ ...rsFolder, ...initSaga, ts });

    clear();
    successMessageInConsole(initDirs, command);
  },
};
