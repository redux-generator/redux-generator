const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const {
  createIfNotExist,
  directoryExists,
  writeOrRewrite,
} = require('./files');
const { getOutputPath } = require('./utils');
const { MAIN_FOLDER } = require('./constants');

const JSON_INIT_TEMPLATE = require('../json/init.json');
// const getTemplatePath = (url) => path.join(__dirname, '..', '..', url);

const filesArray = [
  {
    // templatePath: getTemplatePath(`templates/init/store/global-reducer.txt`),
    json: JSON_INIT_TEMPLATE.store_global_reducer,
    outputPath: 'src/*/global-reducer.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    // templatePath: getTemplatePath('templates/init/store/index.txt'),
    json: JSON_INIT_TEMPLATE.store_index,
    outputPath: 'src/*/index.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    // templatePath: getTemplatePath('templates/init/store/initial-store.txt'),
    json: JSON_INIT_TEMPLATE.store_initial_store,
    outputPath: 'src/*/initial-store.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    // templatePath: getTemplatePath('templates/init/store/model.txt'),
    json: JSON_INIT_TEMPLATE.store_model,
    outputPath: 'src/*/model.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    // templatePath: getTemplatePath(
    //   'templates/init/store/authenticate/actions.txt',
    // ),
    json: JSON_INIT_TEMPLATE.store_auth_actions,
    outputPath: 'src/*/authenticate/actions.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    // templatePath: getTemplatePath(
    //   'templates/init/store/authenticate/types.txt',
    // ),
    json: JSON_INIT_TEMPLATE.store_auth_types,
    outputPath: 'src/*/authenticate/types.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    // templatePath: getTemplatePath(
    //   'templates/init/store/authenticate/reducer.txt',
    // ),
    json: JSON_INIT_TEMPLATE.store_auth_reducer,
    outputPath: 'src/*/authenticate/reducer.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    // templatePath: getTemplatePath(
    //   'templates/init/store/authenticate/model.txt',
    // ),
    json: JSON_INIT_TEMPLATE.store_auth_model,
    outputPath: 'src/*/authenticate/model.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    // templatePath: getTemplatePath('templates/init/sagas/index.txt'),
    json: JSON_INIT_TEMPLATE.saga_index,
    outputPath: 'src/*/index.ts',
    folderKey: 'sagaFolderName',
    optional: true,
  },
  {
    // templatePath: getTemplatePath(
    //   'templates/init/sagas/authenticate/index.txt',
    // ),
    json: JSON_INIT_TEMPLATE.saga_auth_index,
    outputPath: 'src/*/authenticate/index.ts',
    folderKey: 'sagaFolderName',
    optional: true,
  },
];

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

module.exports = {
  manager: async (answers) => {
    createIfNotExist(path.join(MAIN_FOLDER)); // check src folder

    const result = await createFiles(answers);

    return result;
  },
};
