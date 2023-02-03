import { UserApi } from '../api/userApi'
import { getCompaniesAdminAction } from './companyActions'
import { makeAsyncAction } from './makeAsyncAction'
import {
  DELETE_PROFILE_SUCCESS,
  EDIT_PROFILE_SUCCESS,
  GET_USERS_ADMIN_SUCCESS,
  EDIT_USER_ADMIN_SUCCESS,
  DELETE_USER_ADMIN_SUCCESS,
  CREATE_NEW_USER_PASSWORD_SUCCESS,
} from './types'

export const editUserAction = (id, user) => {
  return (dispatch) => {
    makeAsyncAction(dispatch, {
      api: UserApi.editUser,
      apiArguments: [id, user],
      successActions: [editUserAdminSuccess],
      successArguments: [id],
      successMessage: 'User changed',
    })
  }
}

export const editProfileAction = (id, user) => {
  return (dispatch) => {
    makeAsyncAction(dispatch, {
      api: UserApi.editUser,
      apiArguments: [id, user],
      successActions: [editProfileSuccess],
      successArguments: [id],
      successMessage: 'Profile changed',
    })
  }
}

export const createNewPasswordAction = (id, password) => {
  return (dispatch) => {
    makeAsyncAction(dispatch, {
      api: UserApi.editUserPassword,
      apiArguments: [id, { password }],
      successActions: [createNewUserPasswordSuccess],
      successMessage: 'Password changed',
    })
  }
}

export const deleteUserAction = (id) => {
  return (dispatch) => {
    makeAsyncAction(dispatch, {
      api: UserApi.deleteUser,
      apiArguments: [id],
      successActions: [deleteUserAdminSuccess, getCompaniesAdminAction],
      successArguments: [id],
      successMessage: 'User deleted',
    })
  }
}

export const deleteProfileAction = (id) => {
  return (dispatch) => {
    makeAsyncAction(dispatch, {
      api: UserApi.deleteUser,
      apiArguments: [id],
      successActions: [deleteProfileSuccess],
    })
  }
}

export const getUsersAdminAction = () => {
  return (dispatch) => {
    makeAsyncAction(dispatch, {
      api: UserApi.getUsersAdmin,
      successActions: [getUsersAdminSuccess],
    })
  }
}

const getUsersAdminSuccess = (users) => ({
  type: GET_USERS_ADMIN_SUCCESS,
  payload: users,
})

const deleteProfileSuccess = () => ({
  type: DELETE_PROFILE_SUCCESS,
})

const deleteUserAdminSuccess = (res, id) => ({
  type: DELETE_USER_ADMIN_SUCCESS,
  payload: id,
})

const editProfileSuccess = (user, id) => ({
  type: EDIT_PROFILE_SUCCESS,
  payload: { user, id },
})

const editUserAdminSuccess = (user, id) => ({
  type: EDIT_USER_ADMIN_SUCCESS,
  payload: { id, user },
})

const createNewUserPasswordSuccess = () => ({
  type: CREATE_NEW_USER_PASSWORD_SUCCESS,
})
