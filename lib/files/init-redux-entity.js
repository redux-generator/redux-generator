const path = require('path');

const getTemplatePath = (url) => path.join(__dirname, '..', '..', 'templates', url);

const filesArray = [
  {
    templatePath: getTemplatePath('entity/types.ejs'),
    keyInJson: 'types',
    outputPath: '*/#/types',
  },
  {
    templatePath: getTemplatePath('entity/actions.ejs'),
    keyInJson: 'actions',
    outputPath: '*/#/actions',
  },
  {
    templatePath: getTemplatePath('entity/model.ejs'),
    keyInJson: 'model',
    outputPath: '*/#/model',
    dependOn: { ts: true },
  },
  {
    templatePath: getTemplatePath('entity/reducer.ejs'),
    keyInJson: 'reducer',
    outputPath: '*/#/reducer',
  },
  {
    templatePath: getTemplatePath('entity/saga.ejs'),
    keyInJson: 'saga',
    outputPath: '*/#/saga',
    dependOn: { saga: true },
  },
  {
    templatePath: getTemplatePath('entity/actions.test.ejs'),
    keyInJson: 'actions_test',
    outputPath: '*/#/actions.test',
  },
  {
    templatePath: getTemplatePath('entity/reducer.test.ejs'),
    keyInJson: 'reducer_test',
    outputPath: '*/#/reducer.test',
  },
  {
    templatePath: getTemplatePath('entity/api.ejs'),
    keyInJson: 'api',
    outputPath: '*/#/api',
  },
];

module.exports = { filesArray };
