import {
  DELETE_COMPANY_SUCCESS,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_ADMIN_SUCCESS,
} from '../actions/types'

const initialState = []

export const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANIES_SUCCESS:
      return action.payload
    case DELETE_COMPANY_SUCCESS:
      return state.filter((company) => +company.id !== +action.payload)
    case GET_COMPANIES_ADMIN_SUCCESS:
      return action.payload
    default:
      return state
  }
}
