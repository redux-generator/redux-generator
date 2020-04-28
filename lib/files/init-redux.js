const path = require('path');

const JSON_INIT_TEMPLATE = require('../../json/init.json');

const getTemplatePath = (url) => path.join(__dirname, '..', '..', 'templates', url);

const filesArray = [
  {
    templatePath: getTemplatePath('init/store/global-reducer.txt'),
    json: JSON_INIT_TEMPLATE.store_global_reducer,
    outputPath: '*/global-reducer.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    templatePath: getTemplatePath('init/store/index.txt'),
    json: JSON_INIT_TEMPLATE.store_index,
    outputPath: '*/index.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    templatePath: getTemplatePath('init/store/initial-store.txt'),
    json: JSON_INIT_TEMPLATE.store_initial_store,
    outputPath: '*/initial-store.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    templatePath: getTemplatePath('init/store/model.txt'),
    json: JSON_INIT_TEMPLATE.store_model,
    outputPath: '*/model.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    templatePath: getTemplatePath('init/store/authenticate/actions.txt'),
    json: JSON_INIT_TEMPLATE.store_auth_actions,
    outputPath: '*/authenticate/actions.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    templatePath: getTemplatePath('init/store/authenticate/types.txt'),
    json: JSON_INIT_TEMPLATE.store_auth_types,
    outputPath: '*/authenticate/types.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    templatePath: getTemplatePath('init/store/authenticate/reducer.txt'),
    json: JSON_INIT_TEMPLATE.store_auth_reducer,
    outputPath: '*/authenticate/reducer.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    templatePath: getTemplatePath('init/store/authenticate/model.txt'),
    json: JSON_INIT_TEMPLATE.store_auth_model,
    outputPath: '*/authenticate/model.ts',
    folderKey: 'reduxStoreFolderName',
    optional: false,
  },
  {
    templatePath: getTemplatePath('init/sagas/index.txt'),
    json: JSON_INIT_TEMPLATE.saga_index,
    outputPath: '*/index.ts',
    folderKey: 'sagaFolderName',
    optional: true,
  },
  {
    templatePath: getTemplatePath('init/sagas/authenticate/index.txt'),
    json: JSON_INIT_TEMPLATE.saga_auth_index,
    outputPath: '*/authenticate/index.ts',
    folderKey: 'sagaFolderName',
    optional: true,
  },
];

module.exports = { filesArray };
