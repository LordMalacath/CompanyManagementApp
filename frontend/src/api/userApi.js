import { axiosInstance } from './axiosInstance'

export class UserApi {
  static async deleteUser() {
    const res = await axiosInstance.delete('users')
    return res
  }

  static async editUser(user) {
    const res = await axiosInstance.patch('users', user)
    return res
  }

  static async getUsersAdmin() {
    const res = await axiosInstance.get('users/all')
    return res.data
  }
}
