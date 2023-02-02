import { axiosInstance } from './axiosInstance'

export class UserApi {
  static async deleteUser(id) {
    const res = await axiosInstance.delete(`users/${id}`)
    return res
  }

  static async editUser(id, user) {
    const res = await axiosInstance.patch(`users/${id}`, user)
    return res.data
  }

  static async editUserPassword(id, user) {
    const res = await axiosInstance.patch(`users/${id}/password`, user)
    return res
  }

  static async getUsersAdmin() {
    const res = await axiosInstance.get('users/all')
    return res.data
  }
}
