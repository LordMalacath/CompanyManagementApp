import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthorizingRoute = () => {
  const auth = useSelector((state) => state.user.token)
  return auth ? <Navigate to="/" /> : <Outlet />
}
