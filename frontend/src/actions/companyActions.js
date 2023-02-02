import { toast } from 'react-toastify'
import { CompaniesApi } from '../api/companiesApi'
import {
  CREATE_COMPANY_SUCCESS,
  DELETE_COMPANY_SUCCESS,
  EDIT_COMPANY_SUCCESS,
  GET_COMPANIES_SUCCESS,
  ASYNC_ACTION_STARTED,
  ASYNC_ACTION_FAILURE,
  GET_COMPANIES_ADMIN_SUCCESS,
} from './types'

export const createCompanyAction = (company) => {
  return (dispatch) => {
    dispatch(companiesActionStarted())
    CompaniesApi.createCompany(company)
      .then((res) => {
        dispatch(createCompanySuccess(res))
        dispatch(getCompaniesAction('User'))
        toast.success(`${company.name} created`)
      })
      .catch((err) => {
        dispatch(companiesActionFailure(err))
      })
  }
}

export const deleteCompanyAction = (id) => {
  return (dispatch) => {
    dispatch(companiesActionStarted())
    CompaniesApi.deleteCompany(id)
      .then(() => {
        dispatch(deleteCompanySuccess(id))
        toast.success('Company deleted')
      })
      .catch((err) => {
        dispatch(companiesActionFailure(err))
      })
  }
}

export const editCompanyAction = (id, company, role) => {
  return (dispatch) => {
    dispatch(companiesActionStarted())
    CompaniesApi.editCompany(id, company)
      .then(() => {
        dispatch(getCompaniesAction(role))
        dispatch(editCompanySuccess())
        toast.success(`${company.name} changed`)
      })
      .catch((err) => {
        dispatch(companiesActionFailure(err))
      })
  }
}

export const getCompaniesAction = (role) => {
  return (dispatch) => {
    dispatch(companiesActionStarted())
    getCompanies(role)
      .then((res) => {
        if (role === 'Admin') {
          dispatch(getAdminCompaniesSuccess(res))
        } else {
          dispatch(getCompaniesSuccess(res))
        }
      })
      .catch((err) => {
        dispatch(companiesActionFailure(err))
      })
  }
}

const getCompanies = (role) => {
  if (role === 'Admin') {
    return CompaniesApi.getCompaniesAdmin()
  } else {
    return CompaniesApi.getCompanies()
  }
}

const companiesActionStarted = () => ({
  type: ASYNC_ACTION_STARTED,
})

const companiesActionFailure = (error) => ({
  type: ASYNC_ACTION_FAILURE,
  payload: {
    error,
  },
})

const createCompanySuccess = (companies) => ({
  type: CREATE_COMPANY_SUCCESS,
  payload: companies,
})

const deleteCompanySuccess = (id) => ({
  type: DELETE_COMPANY_SUCCESS,
  payload: id,
})

const getAdminCompaniesSuccess = (companies) => ({
  type: GET_COMPANIES_ADMIN_SUCCESS,
  payload: companies,
})

const getCompaniesSuccess = (companies) => ({
  type: GET_COMPANIES_SUCCESS,
  payload: companies,
})

const editCompanySuccess = () => ({
  type: EDIT_COMPANY_SUCCESS,
})
