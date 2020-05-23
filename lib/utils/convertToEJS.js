const { filesArray: reduxArr } = require('../files/init-redux');
const { filesArray: entityArr } = require('../files/init-redux-entity');

const entityJSON = require('../../json/entity.json');
const initJSON = require('../../json/init.json');

const {
  createIfNotExist,
  writeOrRewrite,
  directoryExists,
} = require('./files');

const FILES = [
  { json: entityJSON, arr: entityArr },
  { json: initJSON, arr: reduxArr },
];

const templatesDirName = 'templates';

setImmediate(async () => {
  FILES.forEach((el) => {
    el.arr.forEach((item) => {
      const fullPath = item.templatePath.split('/');
      const templateDirIndex = fullPath.indexOf(templatesDirName);
      const pathForCreate = fullPath.slice(templateDirIndex);
      const finalFileName = pathForCreate[pathForCreate.length - 1];

      pathForCreate.reduce((acc, i) => {
        if (!acc) {
          // first check
          createIfNotExist(i);
          return i;
        }

        if (i === finalFileName) {
          // final name
          const newPath = `${acc}/${i}`;
          const exist = directoryExists(newPath);
          writeOrRewrite(exist, newPath, el.json[item.keyInJson]);
          return newPath;
        }

        const newPath = `${acc}/${i}`;
        createIfNotExist(newPath);
        return newPath;
      }, '');
    });
  });

  console.log('DONE');
});
