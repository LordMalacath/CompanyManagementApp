import { toast } from 'react-toastify'
import { UserApi } from '../api/userApi'
import {
  ASYNC_ACTION_STARTED,
  ASYNC_ACTION_FAILURE,
  DELETE_USER_SUCCESS,
  CHANGE_USER_SUCCESS,
  GET_ADMIN_USERS_SUCCESS,
} from './types'

export const editUserAction = (user) => {
  return (dispatch) => {
    dispatch(userActionStarted())
    UserApi.editUser(user)
      .then((res) => {
        dispatch(changeUserSuccess(res))
        toast.success('Profile changed')
      })
      .catch((err) => {
        dispatch(userActionFailure(err))
        toast.error(`${err.response.data.message}`)
      })
  }
}

export const deleteUserAction = () => {
  return (dispatch) => {
    dispatch(userActionStarted())
    UserApi.deleteUser()
      .then((res) => {
        dispatch(deleteUserSuccess(res))
      })
      .catch((err) => {
        dispatch(userActionFailure(err))
        toast.error('Something went wrong, try again later')
      })
  }
}

export const getUsersAdminAction = () => {
  return (dispatch) => {
    dispatch(userActionStarted())
    UserApi.getUsersAdmin()
      .then((res) => {
        dispatch(getAdminUsersSuccess(res))
      })
      .catch((err) => {
        dispatch(userActionFailure(err))
      })
  }
}

const getAdminUsersSuccess = (users) => ({
  type: GET_ADMIN_USERS_SUCCESS,
  payload: users,
})

const userActionStarted = () => ({
  type: ASYNC_ACTION_STARTED,
})

const userActionFailure = (error) => ({
  type: ASYNC_ACTION_FAILURE,
  payload: {
    error,
  },
})

const deleteUserSuccess = () => ({
  type: DELETE_USER_SUCCESS,
})

const changeUserSuccess = (user) => ({
  type: CHANGE_USER_SUCCESS,
  payload: user.data,
})
