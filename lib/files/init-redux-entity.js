const path = require('path');

const JSON_TEMPLATE = require('../../json/entity.json');

const getTemplatePath = (url) => path.join(__dirname, '..', '..', 'templates', url);

const filesArray = [
  {
    templatePath: getTemplatePath('entity/types.ejs'),
    json: JSON_TEMPLATE.types,
    outputPath: '*/#/types',
  },
  {
    templatePath: getTemplatePath('entity/actions.ejs'),
    json: JSON_TEMPLATE.actions,
    outputPath: '*/#/actions',
  },
  {
    templatePath: getTemplatePath('entity/model.ejs'),
    json: JSON_TEMPLATE.model,
    outputPath: '*/#/model',
    dependOn: {
      ts: true,
    },
  },
  {
    templatePath: getTemplatePath('entity/reducer.ejs'),
    json: JSON_TEMPLATE.reducer,
    outputPath: '*/#/reducer',
  },
  {
    templatePath: getTemplatePath('entity/saga.ejs'),
    json: JSON_TEMPLATE.saga,
    outputPath: '*/#/saga',
    dependOn: {
      saga: true,
    },
  },
];

module.exports = { filesArray };
