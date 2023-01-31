import { axiosInstance } from './axiosInstance'

export class AuthApi {
  static async registerUser(user) {
    const res = await axiosInstance.post('auth/signup', user)
    return res.data
  }

  static async authorizeUser(user) {
    const res = await axiosInstance.post('auth/signin', user)
    return res.data
  }
}
