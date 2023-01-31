import {
  MENU_STATE_CHANGE,
  ASYNC_ACTION_STARTED,
  ASYNC_ACTION_FAILURE,
  CREATE_COMPANY_SUCCESS,
  DELETE_COMPANY_SUCCESS,
  EDIT_COMPANY_SUCCESS,
  GET_COMPANIES_SUCCESS,
  AUTH_SUCCESS,
  CHANGE_USER_SUCCESS,
  LOG_OUT,
  DELETE_USER_SUCCESS,
  GET_ADMIN_COMPANIES_SUCCESS,
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
      return { ...state, isLoading: false }
    case AUTH_SUCCESS:
      return { ...state, isLoading: false }
    case CHANGE_USER_SUCCESS:
      return { ...state, isLoading: false }
    case CREATE_COMPANY_SUCCESS:
      return { ...state, isLoading: false }
    case EDIT_COMPANY_SUCCESS:
      return { ...state, isLoading: false }
    case DELETE_COMPANY_SUCCESS:
      return { ...state, isLoading: false }
    case GET_COMPANIES_SUCCESS:
      return { ...state, isLoading: false }
    case GET_ADMIN_COMPANIES_SUCCESS:
      return { ...state, isLoading: false }
    case LOG_OUT:
      return initialState
    case DELETE_USER_SUCCESS:
      return initialState
    default:
      return state
  }
}
