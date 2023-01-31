import { toast } from 'react-toastify'
import { AuthApi } from '../api/authApi'
import {
  ASYNC_ACTION_STARTED,
  ASYNC_ACTION_FAILURE,
  AUTH_SUCCESS,
  LOG_OUT,
} from './types'

export const registerUserAction = (user) => {
  return (dispatch) => {
    dispatch(authActionStarted())
    AuthApi.registerUser(user)
      .then((res) => {
        dispatch(authSuccess(res))
        toast.success('Registration completed successfully')
      })
      .catch((err) => {
        dispatch(authActionFailure(err))
        toast.error(`${err.response.data.message}`)
      })
  }
}

export const authorizeUserAction = (user) => {
  return (dispatch) => {
    dispatch(authActionStarted())
    AuthApi.authorizeUser(user)
      .then((res) => {
        dispatch(authSuccess(res))
      })
      .catch((err) => {
        dispatch(authActionFailure(err))
        toast.error(`${err.response.data.message}`)
      })
  }
}

export const logOutAction = () => ({
  type: LOG_OUT,
})

const authActionStarted = () => ({
  type: ASYNC_ACTION_STARTED,
})

const authActionFailure = (error) => ({
  type: ASYNC_ACTION_FAILURE,
  payload: {
    error,
  },
})

const authSuccess = (user) => ({
  type: AUTH_SUCCESS,
  payload: user,
})
