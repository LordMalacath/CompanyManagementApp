import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const UserRoute = () => {
  const isUser = useSelector((state) => state.user.role === 'User')
  return isUser ? <Outlet /> : <Navigate to="/" />
}
