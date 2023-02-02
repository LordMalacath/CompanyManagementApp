import { Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { EditCompanyForm } from '../EditForms/EditCompanyForm'
import { EditUserForm } from '../EditForms/EditUserForm'
import { BackButton } from '../BackButton/BackButton'
import { findById } from '../../utils/findById'
import './EditPage.css'

export const EditPage = (props) => {
  const { type } = props
  const { id } = useParams()
  const role = useSelector((state) => state.user.role)
  const stateData = useSelector((state) => ({
    company: role === 'Admin' ? state.admin.companies : state.user.company,
    user: role === 'Admin' ? state.admin.users : [state.user],
  }))
  const valuesToFill = findById(stateData[type], id)

  if (!valuesToFill) return <Navigate to="/" replace />

  return (
    <section className="edit">
      <h2 className="edit__title">
        {type === 'user' ? 'Edit profile' : 'Edit company'}
      </h2>
      {type === 'company' && (
        <EditCompanyForm id={id} valuesToFill={valuesToFill} />
      )}
      {type === 'user' && <EditUserForm id={id} valuesToFill={valuesToFill} />}
      <BackButton />
    </section>
  )
}
