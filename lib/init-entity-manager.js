const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const {
  createIfNotExist,
  directoryExists,
  writeOrRewrite,
} = require('./files');
const {
  getOutputPath,
  upperCaseForFirstLetter,
  checkNestedPath,
} = require('./utils');
const { getUserInfoFromRequest } = require('./types');

const JSON_TEMPLATE = require('../json/entity.json');
// const getTemplatePath = (url) => path.join(__dirname, '..', '..', url);

const filesArray = [
  {
    // templatePath: getTemplatePath(`templates/entity/types.txt`),
    json: JSON_TEMPLATE.types,
    outputPath: '*/#/types.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    // templatePath: getTemplatePath(`templates/entity/actions.txt`),
    json: JSON_TEMPLATE.actions,
    outputPath: '*/#/actions.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    // templatePath: getTemplatePath(`templates/entity/model.txt`),
    json: JSON_TEMPLATE.model,
    outputPath: '*/#/model.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    // templatePath: getTemplatePath(`templates/entity/reducer.txt`),
    json: JSON_TEMPLATE.reducer,
    outputPath: '*/#/reducer.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    // templatePath: getTemplatePath(`templates/entity/index.txt`),
    json: JSON_TEMPLATE.saga,
    outputPath: '*/#/index.ts',
    folderKey: 'sagaFolderName',
    optional: true,
  },
];

module.exports = {
  entityManager: async (answers) => {
    const userRequest = getUserInfoFromRequest(answers);

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
  },
};
