import {
  DELETE_COMPANY_SUCCESS,
  GET_COMPANIES_SUCCESS,
  AUTH_SUCCESS,
  LOG_OUT,
  DELETE_USER_SUCCESS,
  CHANGE_USER_SUCCESS,
} from '../actions/types'

const initialState = {
  isAuthorized: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload.user,
        token: action.payload.token,
        isAuthorized: true,
      }
    case LOG_OUT:
      return initialState
    case DELETE_USER_SUCCESS:
      return initialState
    case CHANGE_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        company: state.company.filter(
          (company) => +company.id !== +action.payload,
        ),
      }
    case GET_COMPANIES_SUCCESS:
      return {
        ...state,
        company: action.payload,
      }
    default:
      return state
  }
}
