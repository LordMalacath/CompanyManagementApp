import {
  AUTH_SUCCESS,
  LOG_OUT,
  DELETE_PROFILE_SUCCESS,
  EDIT_PROFILE_SUCCESS,
} from '../actions/types'

const initialState = {}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload.user,
        token: action.payload.token,
      }
    case LOG_OUT:
      return initialState
    case DELETE_PROFILE_SUCCESS:
      return initialState
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload.user,
      }
    default:
      return state
  }
}
