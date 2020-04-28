const clear = require('clear');
const path = require('path');
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
const { defaultStoreFolder, defaultSagaFolder } = require('../constants');

const { filesArray } = require('../files/init-redux');

const createFiles = async (answers) => {
  return filesArray
    .filter((el) => {
      if (!el.optional) return true;
      if (el.optional && answers.reduxSaga) return true;
      return false;
    })
    .map((file) => {
      const { fullPath, dir, ...rest } = getOutputPath(
        file.outputPath,
        answers[file.folderKey],
        answers.entityName,
      );

      createIfNotExist(dir);

      // const templateContents = fs.readFileSync(file.templatePath, 'utf8');

      // generate join files
      // fs.writeFileSync(
      //   `${dir}/${rest.name}.json`,
      //   JSON.stringify({ data: templateContents }),
      //   { flag: 'wx' },
      // );

      const content = ejs.render(file.json, {
        saga: answers.reduxSaga,
        reduxStoreFolderName: answers.reduxStoreFolderName,
        sagaFolderName: answers.sagaFolderName,
      });

      const fileExist = directoryExists(fullPath);
      return writeOrRewrite(fileExist, fullPath, content);
    });
};

const manager = async (answers) => {
  // check path for redux
  checkNestedPath(answers.reduxStoreFolderName);

  // check path for saga if exist
  if (answers.reduxSaga) {
    checkNestedPath(answers.sagaFolderName);
  }

  const result = await createFiles(answers);

  return result;
};

module.exports = {
  initRedux: async (command) => {
    const rs_folder = await inquirer.askFolderNameForReduxStore(
      defaultStoreFolder,
    );
    const init_saga = await inquirer.askIncludeSaga(defaultSagaFolder);

    const init_dirs = await manager({ ...rs_folder, ...init_saga });

    clear();
    successMessageInConsole(init_dirs, command);
  },
};
