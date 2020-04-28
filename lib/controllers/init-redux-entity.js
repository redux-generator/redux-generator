const clear = require('clear');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const inquirer = require('../utils/inquirer');
const {
  successMessageInConsole,
  checkNestedPath,
  getOutputPath,
  upperCaseForFirstLetter,
} = require('../utils');
const {
  createIfNotExist,
  directoryExists,
  writeOrRewrite,
} = require('../utils/files');
const {
  defaultSagaFolderEntity,
  defaultStoreFolderEntity,
} = require('../constants');

const { getReduxEntityInfo } = require('../utils/redux-entity-info');
const { filesArray } = require('../files/init-redux-entity');

const entityManager = async (answers) => {
  const userRequest = getReduxEntityInfo(answers);

  // check path for redux
  checkNestedPath(answers.reduxStoreFolderName);

  // check path for saga if exist
  if (answers.reduxSaga) {
    checkNestedPath(answers.sagaFolderName);
  }

  const result = filesArray
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
        worker: userRequest,
        entity: upperCaseForFirstLetter(answers.entityName),
        singleEntityUpperCase: answers.entityName.toUpperCase(),
        singleEntityLowerCase: answers.entityName.toLowerCase(),
        reduxStoreFolderName: answers.reduxStoreFolderName
          .split('/')
          .slice(-1)
          .join(''),
      });

      const fileExist = directoryExists(fullPath);
      return writeOrRewrite(fileExist, fullPath, content);
    });

  return result;
};

module.exports = {
  initReduxEntity: async (command) => {
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
  },
};
