const fs = require('fs');
const path = require('path');

const { filesArray: reduxArr } = require('../files/init-redux');
const { filesArray: entityArr } = require('../files/init-redux-entity');

const FILES = [
  { json: 'entity.json', arr: entityArr },
  { json: 'init.json', arr: reduxArr },
];

setImmediate(async () => {
  const pathToJsonDir = path.join(__dirname, '..', '..', 'json');

  FILES.forEach((item) => {
    const json = item.arr.reduce((acc, el) => {
      const content = fs.readFileSync(el.templatePath, 'utf8');
      return { ...acc, [el.keyInJson]: content };
    }, {});
    const pathToJson = path.join(pathToJsonDir, item.json);
    fs.writeFileSync(pathToJson, JSON.stringify(json, null, 2));
  });
  console.log('DONE');
});
