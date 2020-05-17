const path = require('path');

const getTemplatePath = (url) => path.join(__dirname, '..', '..', 'templates', url);

const filesArray = [
  {
    templatePath: getTemplatePath('init/global-reducer.ejs'),
    keyInJson: 'store_global_reducer',
    outputPath: '*/global-reducer',
  },
  {
    templatePath: getTemplatePath('init/index.ejs'),
    keyInJson: 'store_index',
    outputPath: '*/index',
  },
  {
    templatePath: getTemplatePath('init/initial-store.ejs'),
    keyInJson: 'store_initial_store',
    outputPath: '*/initial-store',
  },
  {
    templatePath: getTemplatePath('init/model.ejs'),
    keyInJson: 'store_model',
    outputPath: '*/model',
    dependOn: { ts: true },
  },
  {
    templatePath: getTemplatePath('init/saga.ejs'),
    keyInJson: 'saga_index',
    outputPath: '*/saga',
    dependOn: { saga: true },
  },
  {
    templatePath: getTemplatePath('entity/actions.ejs'),
    keyInJson: 'store_auth_actions',
    outputPath: '*/authenticate/actions',
  },
  {
    templatePath: getTemplatePath('entity/types.ejs'),
    keyInJson: 'store_auth_types',
    outputPath: '*/authenticate/types',
  },
  {
    templatePath: getTemplatePath('entity/reducer.ejs'),
    keyInJson: 'store_auth_reducer',
    outputPath: '*/authenticate/reducer',
  },
  {
    templatePath: getTemplatePath('entity/model.ejs'),
    keyInJson: 'store_auth_model',
    outputPath: '*/authenticate/model',
    dependOn: { ts: true },
  },
  {
    templatePath: getTemplatePath('entity/saga.ejs'),
    keyInJson: 'saga_auth_index',
    outputPath: '*/authenticate/saga',
    dependOn: { saga: true },
  },
  {
    templatePath: getTemplatePath('entity/actions.test.ejs'),
    keyInJson: 'auth_actions_test',
    outputPath: '*/authenticate/actions.test',
  },
  {
    templatePath: getTemplatePath('entity/reducer.test.ejs'),
    keyInJson: 'auth_reducer_test',
    outputPath: '*/authenticate/reducer.test',
  },
  {
    templatePath: getTemplatePath('entity/api.ejs'),
    keyInJson: 'auth_api',
    outputPath: '*/authenticate/api',
  },
];

module.exports = { filesArray };
