const inquirer = require('inquirer');

module.exports = {
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

  askIncludeSaga: (folder) => inquirer
    .prompt({
      name: 'reduxSaga',
      type: 'confirm',
      message: 'Include Redux-saga ?',
    })
    .then((confirm) => {
      if (!confirm.reduxSaga) return { ...confirm, sagaFolderName: folder };

      return inquirer
        .prompt({
          name: 'sagaFolderName',
          type: 'input',
          default: folder,
          message: 'Folder name for Saga:',
        })
        .then((answers) => ({
          ...confirm,
          ...answers,
          sagaFolderName:
              answers.sagaFolderName.trim().length === 0
                ? folder
                : answers.sagaFolderName,
        }));
    }),

  // askIncludeTypescript: () => {
  //   return inquirer.prompt({
  //     name: 'typescript',
  //     type: 'confirm',
  //     message: 'Include Typescript ?',
  //   });
  // },

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
