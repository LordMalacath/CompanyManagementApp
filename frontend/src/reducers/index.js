import { combineReducers } from 'redux'
import { adminReducer } from './admin'
import { companiesReducer } from './companies'
import { pageReducer } from './page'
import { userReducer } from './user'

export const rootReducer = combineReducers({
  page: pageReducer,
  user: userReducer,
  companies: companiesReducer,
  admin: adminReducer,
})
