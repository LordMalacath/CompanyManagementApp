import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Layout } from '../components/Layout/Layout'
import { List } from '../components/List/List'
import { SignPage } from '../components/SignPage/SignPage'
import { DetailsPage } from '../components/DetailsPage/DetailsPage'
import { CreatePage } from '../components/CreatePage/CreatePage'
import { EditPage } from '../components/EditPage/EditPage'
import { axiosInstance } from '../api/axiosInstance'
import { PrivateRoute } from '../utils/PrivateRoute'
import { AuthorizingRoute } from '../utils/AuthorizingRoute'

function App() {
  const token = useSelector((state) => state.user.token)

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }, [token])

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<List type="company" />} />
          <Route path="user/:id" element={<DetailsPage type="user" />} />
          <Route path="user/:id/edit" element={<EditPage type="user" />} />
          <Route path="company/new" element={<CreatePage type="company" />} />
          <Route path="company/:id" element={<DetailsPage type="company" />} />
          <Route
            path="company/:id/edit"
            element={<EditPage type="company" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
      <Route element={<AuthorizingRoute />}>
        <Route path="signin" element={<SignPage type="signin" />} />
        <Route path="signup" element={<SignPage type="signup" />} />
        <Route path="*" element={<Navigate to="signin" replace />} />
      </Route>
    </Routes>
  )
}

export default App
