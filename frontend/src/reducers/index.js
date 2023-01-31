import { combineReducers } from 'redux'
import { adminReducer } from './admin'
import { pageReducer } from './page'
import { userReducer } from './user'

export const rootReducer = combineReducers({
  page: pageReducer,
  user: userReducer,
  admin: adminReducer,
})
