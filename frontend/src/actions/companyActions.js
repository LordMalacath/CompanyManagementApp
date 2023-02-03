import { CompaniesApi } from '../api/companiesApi'
import { makeAsyncAction } from './makeAsyncAction'
import {
  CREATE_COMPANY_SUCCESS,
  DELETE_COMPANY_SUCCESS,
  EDIT_COMPANY_SUCCESS,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_ADMIN_SUCCESS,
} from './types'

export const createCompanyAction = (company) => {
  return (dispatch) => {
    makeAsyncAction(dispatch, {
      api: CompaniesApi.createCompany,
      apiArguments: [company],
      successActions: [createCompanySuccess, getCompaniesAction],
      successMessage: `${company.name} created`,
    })
  }
}

export const deleteCompanyAction = (id) => {
  return (dispatch) => {
    makeAsyncAction(dispatch, {
      api: CompaniesApi.deleteCompany,
      apiArguments: [id],
      successActions: [deleteCompanySuccess],
      successArguments: [id],
      successMessage: 'Company deleted',
    })
  }
}

export const editCompanyAction = (id, company, role) => {
  return (dispatch) => {
    makeAsyncAction(dispatch, {
      api: CompaniesApi.editCompany,
      apiArguments: [id, company],
      successActions: [
        role === 'Admin' ? getCompaniesAdminAction : getCompaniesAction,
        editCompanySuccess,
      ],
      successMessage: `${company.name} changed`,
    })
  }
}

export const getCompaniesAction = () => {
  return (dispatch) => {
    makeAsyncAction(dispatch, {
      api: CompaniesApi.getCompanies,
      successActions: [getCompaniesSuccess],
    })
  }
}

export const getCompaniesAdminAction = () => {
  return (dispatch) => {
    makeAsyncAction(dispatch, {
      api: CompaniesApi.getCompaniesAdmin,
      successActions: [getCompaniesAdminSuccess],
    })
  }
}

const createCompanySuccess = (companies) => ({
  type: CREATE_COMPANY_SUCCESS,
  payload: companies,
})

const deleteCompanySuccess = (res, id) => ({
  type: DELETE_COMPANY_SUCCESS,
  payload: id,
})

const getCompaniesAdminSuccess = (companies) => ({
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
