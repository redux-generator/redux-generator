const inquirer = require('inquirer');

module.exports = {
  askFolderName: (defaultFolder) => inquirer
    .prompt({
      name: 'folderName',
      type: 'input',
      default: defaultFolder,
      message: 'Folder name for the entity:',
    })
    .then((answers) => ({
      ...answers,
      folderName:
          answers.folderName.trim().length === 0
            ? defaultFolder
            : answers.folderName,
    })),

  askFolderNameForReduxStore: (folder) => inquirer
    .prompt({
      name: 'reduxStoreFolderName',
      type: 'input',
      default: folder,
      message: 'Folder name for Redux store:',
    })
    .then((answers) => ({
      ...answers,
      reduxStoreFolderName:
          answers.reduxStoreFolderName.trim().length === 0
            ? folder
            : answers.reduxStoreFolderName,
    })),

  askIncludeSagaFile: () => inquirer.prompt({
    name: 'saga',
    type: 'confirm',
    message: 'Include Saga file ?',
  }),

  askEntityName: () => inquirer.prompt({
    name: 'entityName',
    type: 'input',
    message: 'Enter entity name (singular):',
    validate: (v) => {
      if (v.trim().length === 0) return 'Required';
      if (!/^[a-zA-Z0-9]*$/.test(v)) return 'Invalid characters detected please use only letters or digits';
      return true;
    },
  }),

  askCRUD: () => inquirer.prompt([
    {
      type: 'checkbox',
      message: 'Select methods',
      name: 'crud',
      choices: [
        {
          name: 'Get all',
          value: 'getAll',
        },
        {
          name: 'Get by id',
          value: 'getById',
        },
        {
          name: 'Create',
          value: 'create',
        },
        {
          name: 'Update',
          value: 'update',
        },
        {
          name: 'Remove',
          value: 'remove',
        },
      ],
      validate(answer) {
        if (answer.length < 1) {
          return 'You must choose at least one topping.';
        }

        return true;
      },
    },
  ]),
};
