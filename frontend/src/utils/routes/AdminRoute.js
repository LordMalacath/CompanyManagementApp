import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const AdminRoute = () => {
  const isAdmin = useSelector((state) => state.user.role === 'Admin')
  return isAdmin ? <Outlet /> : <Navigate to="/" />
}
