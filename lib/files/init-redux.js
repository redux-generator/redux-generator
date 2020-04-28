const path = require('path');

const JSON_INIT_TEMPLATE = require('../../json/init.json');

const getTemplatePath = (url) => path.join(__dirname, '..', '..', 'templates', url);

const filesArray = [
  {
    templatePath: getTemplatePath('init/global-reducer.ejs'),
    json: JSON_INIT_TEMPLATE.store_global_reducer,
    keyInJson: 'store_global_reducer',
    outputPath: '*/global-reducer',
  },
  {
    templatePath: getTemplatePath('init/index.ejs'),
    json: JSON_INIT_TEMPLATE.store_index,
    keyInJson: 'store_index',
    outputPath: '*/index',
  },
  {
    templatePath: getTemplatePath('init/initial-store.ejs'),
    json: JSON_INIT_TEMPLATE.store_initial_store,
    keyInJson: 'store_initial_store',
    outputPath: '*/initial-store',
  },
  {
    templatePath: getTemplatePath('init/model.ejs'),
    json: JSON_INIT_TEMPLATE.store_model,
    keyInJson: 'store_model',
    outputPath: '*/model',
    dependOn: { ts: true },
  },
  {
    templatePath: getTemplatePath('init/saga.ejs'),
    json: JSON_INIT_TEMPLATE.saga_index,
    keyInJson: 'saga_index',
    outputPath: '*/saga',
    dependOn: { saga: true },
  },
  {
    templatePath: getTemplatePath('entity/actions.ejs'),
    json: JSON_INIT_TEMPLATE.store_auth_actions,
    keyInJson: 'store_auth_actions',
    outputPath: '*/authenticate/actions',
  },
  {
    templatePath: getTemplatePath('entity/types.ejs'),
    json: JSON_INIT_TEMPLATE.store_auth_types,
    keyInJson: 'store_auth_types',
    outputPath: '*/authenticate/types',
  },
  {
    templatePath: getTemplatePath('entity/reducer.ejs'),
    json: JSON_INIT_TEMPLATE.store_auth_reducer,
    keyInJson: 'store_auth_reducer',
    outputPath: '*/authenticate/reducer',
  },
  {
    templatePath: getTemplatePath('entity/model.ejs'),
    json: JSON_INIT_TEMPLATE.store_auth_model,
    keyInJson: 'store_auth_model',
    outputPath: '*/authenticate/model',
    dependOn: { ts: true },
  },
  {
    templatePath: getTemplatePath('entity/saga.ejs'),
    json: JSON_INIT_TEMPLATE.saga_auth_index,
    keyInJson: 'saga_auth_index',
    outputPath: '*/authenticate/saga',
    dependOn: { saga: true },
  },
];

module.exports = { filesArray };
