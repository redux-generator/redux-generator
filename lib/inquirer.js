const inquirer = require('inquirer');

module.exports = {
  askFolderNameForReduxStore: folder => {
    return inquirer
      .prompt({
        name: 'reduxStoreFolderName',
        type: 'input',
        default: folder,
        message: 'Folder name for Redux store:',
      })
      .then(answers => ({
        ...answers,
        reduxStoreFolderName:
          answers.reduxStoreFolderName.trim().length === 0
            ? folder
            : answers.reduxStoreFolderName,
      }));
  },

  askIncludeSaga: folder => {
    return inquirer
      .prompt({
        name: 'reduxSaga',
        type: 'confirm',
        message: 'Include Redux-saga ?',
      })
      .then(confirm => {
        if (!confirm.reduxSaga) return { ...confirm, sagaFolderName: folder };

        return inquirer
          .prompt({
            name: 'sagaFolderName',
            type: 'input',
            default: folder,
            message: 'Folder name for Saga:',
          })
          .then(answers => ({
            ...confirm,
            ...answers,
            sagaFolderName:
              answers.sagaFolderName.trim().length === 0
                ? folder
                : answers.sagaFolderName,
          }));
      });
  },

  // askIncludeTypescript: () => {
  //   return inquirer.prompt({
  //     name: 'typescript',
  //     type: 'confirm',
  //     message: 'Include Typescript ?',
  //   });
  // },

  askEntityName: () => {
    return inquirer.prompt({
      name: 'entityName',
      type: 'input',
      message: 'Enter entity name (singular):',
      validate: v => {
        if (v.trim().length !== 0) return true;
        return 'Required';
      },
    });
  },

  askCRUD: () => {
    return inquirer.prompt([
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
        validate: function(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one topping.';
          }

          return true;
        },
      },
    ]);
  },
};
