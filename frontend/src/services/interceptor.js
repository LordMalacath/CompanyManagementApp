import { toast } from 'react-toastify'
import { axiosInstance } from '../api/axiosInstance'
import { logOutAction } from '../actions/authActions'

export const interceptor = (dispatch) => {
  axiosInstance.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      toast.error(`${error.response.data.message || 'Something went wrong'}`)
      if (error.response && error.response.status === 401) {
        dispatch(logOutAction())
      }
    },
  )
}
