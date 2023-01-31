import {
  GET_ADMIN_COMPANIES_SUCCESS,
  LOG_OUT,
  DELETE_USER_SUCCESS,
  DELETE_COMPANY_SUCCESS,
} from '../actions/types'

const initialState = {
  companies: [],
  users: [],
}

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN_COMPANIES_SUCCESS:
      return { ...state, companies: action.payload }
    case LOG_OUT:
      return initialState
    case DELETE_USER_SUCCESS:
      return initialState
    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: state.companies.filter(
          (company) => +company.id !== +action.payload,
        ),
      }
    default:
      return state
  }
}
