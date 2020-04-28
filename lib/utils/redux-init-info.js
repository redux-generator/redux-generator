const ENTITY_NAME = 'authenticate';

const TEMPLATE = {
  signIn: {
    comment: 'signIn',
    element: [
      {
        type: 'SIGN_IN',
        typePrefix: ENTITY_NAME,
        actionName: 'signIn',
        actionPayload: 'SignInPayload',
        actionType: 'SignInType',
        sagaType: 'SignInSagas',
        sagaFuncName: 'signIn',
        sagaActions: ['signInSuccess', 'signInFail'],
      },
      {
        type: 'SIGN_IN_SUCCESS',
        typePrefix: ENTITY_NAME,
        actionName: 'signInSuccess',
        actionPayload: 'SignInSuccessPayload',
      },
      {
        type: 'SIGN_IN_FAIL',
        typePrefix: ENTITY_NAME,
        actionName: 'signInFail',
        actionPayload: 'SignInFailPayload',
      },
    ],
  },
  signUp: {
    comment: 'signUp',
    element: [
      {
        type: 'SIGN_UP',
        typePrefix: ENTITY_NAME,
        actionName: 'signUp',
        actionPayload: 'SignUpPayload',
        actionType: 'SignUpType',
        sagaType: 'SignUpSagas',
        sagaFuncName: 'signUp',
        sagaActions: ['signUpSuccess', 'signUpFail'],
      },
      {
        type: 'SIGN_UP_SUCCESS',
        typePrefix: ENTITY_NAME,
        actionName: 'signUpSuccess',
        actionPayload: 'SignUpSuccessPayload',
      },
      {
        type: 'SIGN_UP_FAIL',
        typePrefix: ENTITY_NAME,
        actionName: 'signUpFail',
        actionPayload: 'SignUpFailPayload',
      },
    ],
  },
  logOut: {
    comment: 'logOut',
    element: [
      {
        type: 'LOG_OUT',
        typePrefix: ENTITY_NAME,
        actionName: 'logOut',
        actionPayload: 'LogOutPayload',
        actionType: 'LogOutType',
        sagaType: 'LogOutSagas',
        sagaFuncName: 'logOut',
        sagaActions: ['logOutSuccess', 'logOutFail'],
      },
      {
        type: 'LOG_OUT_SUCCESS',
        typePrefix: ENTITY_NAME,
        actionName: 'logOutSuccess',
        actionPayload: 'LogOutSuccessPayload',
      },
      {
        type: 'LOG_OUT_FAIL',
        typePrefix: ENTITY_NAME,
        actionName: 'logOutFail',
        actionPayload: 'LogOutFailPayload',
      },
    ],
  },
  restorePassword: {
    comment: 'restorePassword',
    element: [
      {
        type: 'RESTORE_PASSWORD',
        typePrefix: ENTITY_NAME,
        actionName: 'restorePassword',
        actionPayload: 'RestorePasswordPayload',
        actionType: 'RestorePasswordType',
        sagaType: 'RestorePasswordSagas',
        sagaFuncName: 'restorePassword',
        sagaActions: ['restorePasswordSuccess', 'restorePasswordFail'],
      },
      {
        type: 'RESTORE_PASSWORD_SUCCESS',
        typePrefix: ENTITY_NAME,
        actionName: 'restorePasswordSuccess',
        actionPayload: 'RestorePasswordSuccessPayload',
      },
      {
        type: 'RESTORE_PASSWORD_FAIL',
        typePrefix: ENTITY_NAME,
        actionName: 'restorePasswordFail',
        actionPayload: 'RestorePasswordFailPayload',
      },
    ],
  },
};

module.exports = { TEMPLATE, ENTITY_NAME };
