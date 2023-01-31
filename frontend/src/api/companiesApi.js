import { axiosInstance } from './axiosInstance'

export class CompaniesApi {
  static async getCompanies() {
    const res = await axiosInstance.get('companies/')
    return res.data
  }

  static async createCompany(company) {
    const res = await axiosInstance.post('companies', company)
    return res.data
  }

  static async deleteCompany(id) {
    const res = await axiosInstance.delete(`companies/${id}`)
    return res
  }

  static async editCompany(id, company) {
    const res = await axiosInstance.patch(`companies/${id}`, company)
    return res.data
  }

  static async getCompaniesAdmin() {
    const res = await axiosInstance.get('companies/all')
    return res.data
  }
}
