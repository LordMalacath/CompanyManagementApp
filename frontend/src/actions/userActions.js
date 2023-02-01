import { toast } from 'react-toastify'
import { UserApi } from '../api/userApi'
import { getCompaniesAction } from './companyActions'
import {
  ASYNC_ACTION_STARTED,
  ASYNC_ACTION_FAILURE,
  DELETE_PROFILE_SUCCESS,
  EDIT_PROFILE_SUCCESS,
  GET_USERS_ADMIN_SUCCESS,
  EDIT_USER_ADMIN_SUCCESS,
  DELETE_USER_ADMIN_SUCCESS,
} from './types'

export const editUserAction = (id, user, type = 'profile', role = 'User') => {
  return (dispatch) => {
    dispatch(userActionStarted())
    UserApi.editUser(id, user)
      .then((res) => {
        if (type === 'user' && role === 'Admin') {
          dispatch(editUserAdminSuccess(id, res))
          toast.success('User changed')
        } else {
          dispatch(editProfileSuccess(id, res))
          toast.success('Profile changed')
        }
      })
      .catch((err) => {
        dispatch(userActionFailure(err))
        toast.error(`${err.response.data.message}`)
      })
  }
}

export const deleteUserAction = (id, type = 'profile', role = 'User') => {
  return (dispatch) => {
    dispatch(userActionStarted())
    UserApi.deleteUser(id)
      .then((res) => {
        if (type === 'user' && role === 'Admin') {
          dispatch(deleteUserAdminSuccess(id))
          dispatch(getCompaniesAction(role))
          toast.success('User deleted')
        } else {
          dispatch(deleteProfileSuccess(res))
        }
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
  type: GET_USERS_ADMIN_SUCCESS,
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

const deleteProfileSuccess = () => ({
  type: DELETE_PROFILE_SUCCESS,
})

const deleteUserAdminSuccess = (id) => ({
  type: DELETE_USER_ADMIN_SUCCESS,
  payload: id,
})

const editProfileSuccess = (id, user) => ({
  type: EDIT_PROFILE_SUCCESS,
  payload: { user, id },
})

const editUserAdminSuccess = (id, user) => ({
  type: EDIT_USER_ADMIN_SUCCESS,
  payload: { id, user },
})
