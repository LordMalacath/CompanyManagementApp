import { AuthApi } from '../api/authApi'
import { makeAsyncAction } from './makeAsyncAction'
import { AUTH_SUCCESS, LOG_OUT } from './types'

export const registerUserAction = (user) => {
  return (dispatch) => {
    makeAsyncAction(dispatch, {
      api: AuthApi.registerUser,
      apiArguments: [user],
      successActions: [authSuccess],
      successMessage: 'Registration completed successfully',
    })
  }
}

export const authorizeUserAction = (user) => {
  return (dispatch) => {
    makeAsyncAction(dispatch, {
      api: AuthApi.authorizeUser,
      apiArguments: [user],
      successActions: [authSuccess],
    })
  }
}

export const logOutAction = () => ({
  type: LOG_OUT,
})

const authSuccess = (user) => ({
  type: AUTH_SUCCESS,
  payload: user,
})
