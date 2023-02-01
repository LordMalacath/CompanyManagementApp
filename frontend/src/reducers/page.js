import {
  MENU_STATE_CHANGE,
  ASYNC_ACTION_STARTED,
  ASYNC_ACTION_FAILURE,
  CREATE_COMPANY_SUCCESS,
  DELETE_COMPANY_SUCCESS,
  EDIT_COMPANY_SUCCESS,
  GET_COMPANIES_SUCCESS,
  AUTH_SUCCESS,
  EDIT_PROFILE_SUCCESS,
  LOG_OUT,
  DELETE_PROFILE_SUCCESS,
  GET_COMPANIES_ADMIN_SUCCESS,
  EDIT_USER_ADMIN_SUCCESS,
  DELETE_USER_ADMIN_SUCCESS,
} from '../actions/types'

const initialState = {
  menuIsOpened: false,
  isLoading: false,
}

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_STATE_CHANGE:
      return { ...state, menuIsOpened: !state.menuIsOpened }
    case ASYNC_ACTION_STARTED:
      return { ...state, isLoading: true }
    case ASYNC_ACTION_FAILURE:
    case AUTH_SUCCESS:
    case EDIT_PROFILE_SUCCESS:
    case CREATE_COMPANY_SUCCESS:
    case EDIT_COMPANY_SUCCESS:
    case DELETE_COMPANY_SUCCESS:
    case GET_COMPANIES_SUCCESS:
    case GET_COMPANIES_ADMIN_SUCCESS:
    case EDIT_USER_ADMIN_SUCCESS:
    case DELETE_USER_ADMIN_SUCCESS:
      return { ...state, isLoading: false }
    case LOG_OUT:
      return initialState
    case DELETE_PROFILE_SUCCESS:
      return initialState
    default:
      return state
  }
}
