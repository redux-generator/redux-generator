const {
  replaceAndUpperCase,
  replaceAndUpperCaseForFirstLetter,
  upperCaseForFirstLetter,
} = require('./index');

const TEMPLATE = {
  getAll: [
    {
      type: 'GET_ALL_**S',
      actionName: 'getAll*s',
      case: 'request',
      actionType: 'getAll*sType',
      sagaType: 'getAll*sSagas',
      sagaFuncName: 'getAll*s',
    },
    {
      type: 'GET_ALL_**S_SUCCESS',
      actionName: 'getAll*Success',
      case: 'success',
      actionType: '',
      sagaType: '',
      sagaFuncName: '',
    },
    {
      type: 'GET_ALL_**S_FAIL',
      actionName: 'getAll*Fail',
      case: 'fail',
      actionType: '',
      sagaType: '',
      sagaFuncName: '',
    },
  ],
  getById: [
    {
      type: 'GET_**_BY_ID',
      actionName: 'get*ById',
      case: 'request',
      actionType: 'get*ByIdType',
      sagaType: 'get*ByIdSagas',
      sagaFuncName: 'get*ById',
    },
    {
      type: 'GET_**_BY_ID_SUCCESS',
      actionName: 'get*ByIdSuccess',
      case: 'success',
      actionType: '',
      sagaType: '',
      sagaFuncName: '',
    },
    {
      type: 'GET_**_BY_ID_FAIL',
      actionName: 'get*ByIdFail',
      case: 'fail',
      actionType: '',
      sagaType: '',
      sagaFuncName: '',
    },
  ],
  create: [
    {
      type: 'CREATE_**',
      actionName: 'create*',
      case: 'request',
      actionType: 'create*Type',
      sagaType: 'create*Sagas',
      sagaFuncName: 'create*',
    },
    {
      type: 'CREATE_**_SUCCESS',
      actionName: 'create*Success',
      case: 'success',
      actionType: '',
      sagaType: '',
      sagaFuncName: '',
    },
    {
      type: 'CREATE_**_FAIL',
      actionName: 'create*Fail',
      case: 'fail',
      actionType: '',
      sagaType: '',
      sagaFuncName: '',
    },
  ],
  update: [
    {
      type: 'UPDATE_**',
      actionName: 'update*',
      case: 'request',
      actionType: 'update*Type',
      sagaType: 'update*Sagas',
      sagaFuncName: 'update*',
    },
    {
      type: 'UPDATE_**_SUCCESS',
      actionName: 'update*Success',
      case: 'success',
      actionType: '',
      sagaType: '',
      sagaFuncName: '',
    },
    {
      type: 'UPDATE_**_FAIL',
      actionName: 'update*Fail',
      case: 'fail',
      actionType: '',
      sagaType: '',
      sagaFuncName: '',
    },
  ],
  remove: [
    {
      type: 'REMOVE_**',
      actionName: 'remove*',
      case: 'request',
      actionType: 'remove*Type',
      sagaType: 'remove*Sagas',
      sagaFuncName: 'remove*',
    },
    {
      type: 'REMOVE_**_SUCCESS',
      actionName: 'remove*Success',
      case: 'success',
      actionType: '',
      sagaType: '',
      sagaFuncName: '',
    },
    {
      type: 'REMOVE_**_FAIL',
      actionName: 'remove*Fail',
      case: 'fail',
      actionType: '',
      sagaType: '',
      sagaFuncName: '',
    },
  ],
};

module.exports = {
  getReduxEntityInfo: (answers) => {
    return answers.crud.reduce(
      (acc, item) => {
        const element = TEMPLATE[item].map((el) => {
          const actionName = replaceAndUpperCaseForFirstLetter(
            el.actionName,
            answers.entityName,
          );
          const actionPayload = `${actionName}Payload`;
          return {
            ...el,
            type: replaceAndUpperCase(el.type, answers.entityName),
            typePrefix: answers.entityName,
            entity: upperCaseForFirstLetter(answers.entityName),
            actionName,
            actionPayload,
            actionType: replaceAndUpperCaseForFirstLetter(
              el.actionType,
              answers.entityName,
            ),
            sagaType: replaceAndUpperCaseForFirstLetter(
              el.sagaType,
              answers.entityName,
            ),
            sagaFuncName: replaceAndUpperCaseForFirstLetter(
              el.sagaFuncName,
              answers.entityName,
            ),
          };
        });

        const models = element.reduce((i, e) => {
          const record = {
            [e.case]: e.actionPayload,
            [`${e.case}Type`]: e.type,
            [`${e.case}ActionName`]: e.actionName,
            actionType: e.actionType ? e.actionType : i.actionType,
            sagaType: e.sagaType ? e.sagaType : i.sagaType,
            sagaFuncName: e.sagaFuncName ? e.sagaFuncName : i.sagaFuncName,
          };
          return { ...i, ...record };
        }, {});

        const typesOnly = element.map((el) => el.type);
        return {
          ...acc,
          array: [...acc.array, ...element],
          typesOnly: [...acc.typesOnly, ...typesOnly],
          models: {
            ...acc.models,
            [item]: models,
          },
        };
      },
      { array: [], models: {}, typesOnly: [] },
    );
  },
};
