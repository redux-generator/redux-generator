const {
  replaceAndUpperCase,
  replaceAndUpperCaseForFirstLetter,
} = require('./index');

const TEMPLATE = {
  getAll: [
    {
      type: 'GET_ALL_**S',
      actionName: 'getAll*s',
      actionPayload: 'getAll*sPayload',
      actionType: 'getAll*sType',
      sagaType: 'getAll*sSagas',
      sagaFuncName: 'getAll*s',
      sagaActions: ['getAll*sSuccess', 'getAll*sFail'],
      apiFuncName: 'getAll*sRequest',
    },
    {
      type: 'GET_ALL_**S_SUCCESS',
      actionName: 'getAll*sSuccess',
      actionPayload: 'getAll*SuccessPayload',
    },
    {
      type: 'GET_ALL_**S_FAIL',
      actionName: 'getAll*sFail',
      actionPayload: 'getAll*FailPayload',
    },
  ],
  getById: [
    {
      type: 'GET_**_BY_ID',
      actionName: 'get*ById',
      actionPayload: 'get*ByIdPayload',
      actionType: 'get*ByIdType',
      sagaType: 'get*ByIdSagas',
      sagaFuncName: 'get*ById',
      sagaActions: ['get*ByIdSuccess', 'get*ByIdFail'],
      apiFuncName: 'get*ByIdRequest',
    },
    {
      type: 'GET_**_BY_ID_SUCCESS',
      actionName: 'get*ByIdSuccess',
      actionPayload: 'get*ByIdSuccessPayload',
    },
    {
      type: 'GET_**_BY_ID_FAIL',
      actionName: 'get*ByIdFail',
      actionPayload: 'get*ByIdFailPayload',
    },
  ],
  create: [
    {
      type: 'CREATE_**',
      actionName: 'create*',
      actionPayload: 'create*Payload',
      actionType: 'create*Type',
      sagaType: 'create*Sagas',
      sagaFuncName: 'create*',
      sagaActions: ['create*Success', 'create*Fail'],
      apiFuncName: 'create*Request',
    },
    {
      type: 'CREATE_**_SUCCESS',
      actionName: 'create*Success',
      actionPayload: 'create*SuccessPayload',
    },
    {
      type: 'CREATE_**_FAIL',
      actionName: 'create*Fail',
      actionPayload: 'create*FailPayload',
    },
  ],
  update: [
    {
      type: 'UPDATE_**',
      actionName: 'update*',
      actionPayload: 'update*Payload',
      actionType: 'update*Type',
      sagaType: 'update*Sagas',
      sagaFuncName: 'update*',
      sagaActions: ['update*Success', 'update*Fail'],
      apiFuncName: 'update*Request',
    },
    {
      type: 'UPDATE_**_SUCCESS',
      actionName: 'update*Success',
      actionPayload: 'update*SuccessPayload',
    },
    {
      type: 'UPDATE_**_FAIL',
      actionName: 'update*Fail',
      actionPayload: 'update*FailPayload',
    },
  ],
  remove: [
    {
      type: 'REMOVE_**',
      actionName: 'remove*',
      actionPayload: 'remove*Payload',
      actionType: 'remove*Type',
      sagaType: 'remove*Sagas',
      sagaFuncName: 'remove*',
      sagaActions: ['remove*Success', 'remove*Fail'],
      apiFuncName: 'remove*Request',
    },
    {
      type: 'REMOVE_**_SUCCESS',
      actionName: 'remove*Success',
      actionPayload: 'remove*SuccessPayload',
    },
    {
      type: 'REMOVE_**_FAIL',
      actionName: 'remove*Fail',
      actionPayload: 'remove*FailPayload',
    },
  ],
};

const COMMON_THINGS = {
  getAll: {
    comment: 'getAll*s',
  },
  getById: {
    comment: 'get*ById',
  },
  create: {
    comment: 'create*',
  },
  update: {
    comment: 'update*',
  },
  remove: {
    comment: 'remove*',
  },
};

module.exports = {
  getReduxEntityInfo: ({ entityName, crud }) => crud.reduce((acc, item) => {
    const { comment } = COMMON_THINGS[item];
    const element = TEMPLATE[item].map((el) => ({
      type: replaceAndUpperCase(el.type, entityName),
      typePrefix: entityName,
      actionName: replaceAndUpperCaseForFirstLetter(el.actionName, entityName),
      actionPayload: replaceAndUpperCaseForFirstLetter(el.actionPayload, entityName),
      actionType: replaceAndUpperCaseForFirstLetter(el.actionType, entityName),
      sagaType: replaceAndUpperCaseForFirstLetter(el.sagaType, entityName),
      sagaFuncName: replaceAndUpperCaseForFirstLetter(el.sagaFuncName, entityName),
      apiFuncName: replaceAndUpperCaseForFirstLetter(el.apiFuncName, entityName),
      sagaActions: el.sagaActions
        ? el.sagaActions.map((e) => replaceAndUpperCaseForFirstLetter(e, entityName))
        : [],
    }));

    const currentComment = replaceAndUpperCaseForFirstLetter(comment, entityName);
    return {
      ...acc,
      [item]: {
        comment: currentComment,
        element,
      },
    };
  }, {}),
};
