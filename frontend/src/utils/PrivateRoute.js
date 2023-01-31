import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoute = () => {
  const auth = useSelector((state) => state.user.isAuthorized)
  return auth ? <Outlet /> : <Navigate to="/signin" />
}
