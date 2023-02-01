import {
  GET_COMPANIES_ADMIN_SUCCESS,
  GET_USERS_ADMIN_SUCCESS,
  LOG_OUT,
  DELETE_PROFILE_SUCCESS,
  DELETE_COMPANY_SUCCESS,
  EDIT_USER_ADMIN_SUCCESS,
  DELETE_USER_ADMIN_SUCCESS,
  EDIT_PROFILE_SUCCESS,
} from '../actions/types'

const initialState = {
  companies: [],
  users: [],
}

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANIES_ADMIN_SUCCESS:
      return { ...state, companies: action.payload }
    case GET_USERS_ADMIN_SUCCESS:
      return { ...state, users: action.payload }
    case LOG_OUT:
    case DELETE_PROFILE_SUCCESS:
      return initialState
    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: state.companies.filter(
          (company) => +company.id !== +action.payload,
        ),
      }
    case DELETE_USER_ADMIN_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => +user.id !== +action.payload),
      }
    case EDIT_PROFILE_SUCCESS:
    case EDIT_USER_ADMIN_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          +user.id === +action.payload.id
            ? { ...user, ...action.payload.user }
            : user,
        ),
      }
    default:
      return state
  }
}
