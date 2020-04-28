const path = require('path');

const JSON_TEMPLATE = require('../../json/entity.json');

const getTemplatePath = (url) => path.join(__dirname, '..', '..', '..', 'templates', url);

const filesArray = [
  {
    templatePath: getTemplatePath('entity/types.txt'),
    json: JSON_TEMPLATE.types,
    outputPath: '*/#/types.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    templatePath: getTemplatePath('entity/actions.txt'),
    json: JSON_TEMPLATE.actions,
    outputPath: '*/#/actions.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    templatePath: getTemplatePath('entity/model.txt'),
    json: JSON_TEMPLATE.model,
    outputPath: '*/#/model.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    templatePath: getTemplatePath('entity/reducer.txt'),
    json: JSON_TEMPLATE.reducer,
    outputPath: '*/#/reducer.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    templatePath: getTemplatePath('entity/index.txt'),
    json: JSON_TEMPLATE.saga,
    outputPath: '*/#/index.ts',
    folderKey: 'sagaFolderName',
    optional: true,
  },
];

module.exports = { filesArray };
