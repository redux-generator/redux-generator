const clear = require('clear');
const fs = require('fs');
const ejs = require('ejs');

const inquirer = require('../utils/inquirer');
const {
  successMessageInConsole,
  checkNestedPath,
  getOutputPath,
  upperCaseForFirstLetter,
} = require('../utils');
const {
  createIfNotExist,
  directoryExists,
  writeOrRewrite,
} = require('../utils/files');
const { defaultFolderEntity, TS_FLAGS } = require('../constants');

const { getReduxEntityInfo } = require('../utils/redux-entity-info');
const { filesArray } = require('../files/init-redux-entity');

const JSON_TEMPLATE = require('../../json/entity.json');

const entityManager = async ({
  entityName, crud, folderName, saga, ts,
}) => {
  const isDev = process.env.NODE_ENV === 'development';
  const userRequest = getReduxEntityInfo({ entityName, crud });
  // check path for entity
  checkNestedPath(folderName);

  return filesArray
    .filter((el) => {
      if (!el.dependOn) return true;
      if (el.dependOn.ts && ts) return true;
      if (el.dependOn.saga && saga) return true;
      return false;
    })
    .map((file) => {
      const { fullPath, dir } = getOutputPath(
        file.outputPath,
        folderName,
        entityName,
      );

      createIfNotExist(dir);

      const toRender = isDev ? fs.readFileSync(file.templatePath, 'utf8') : JSON_TEMPLATE[file.keyInJson];
      const pathWithExtension = `${fullPath}${ts ? '.ts' : '.js'}`;

      const content = ejs.render(toRender, {
        worker: userRequest,
        options: {
          ts,
          mainType: `${entityName.toUpperCase()}S`,
          singleEntityLowerCase: entityName.toLowerCase(),
          entityActionTypes: `${upperCaseForFirstLetter(entityName)}ActionTypes`,
          apiNameTitle: `${entityName.toLowerCase()}Api`,
        },
      });

      const fileExist = directoryExists(pathWithExtension);
      return writeOrRewrite(fileExist, pathWithExtension, content);
    });
};

module.exports = {
  initReduxEntity: async (argv) => {
    const command = argv[0];
    const ts = argv.some((el) => TS_FLAGS.find((e) => e === el));
    const entityName = await inquirer.askEntityName();
    const crud = await inquirer.askCRUD();
    const entityFolder = await inquirer.askFolderName(defaultFolderEntity);
    const sagas = await inquirer.askIncludeSagaFile();

    const entityDirs = await entityManager({
      ...entityName,
      ...crud,
      ...entityFolder,
      ...sagas,
      ts,
    });

    clear();
    successMessageInConsole(entityDirs, command);
  },
};
