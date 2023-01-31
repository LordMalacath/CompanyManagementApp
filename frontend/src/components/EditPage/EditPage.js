import { useParams } from 'react-router-dom'
import { EditCompanyForm } from '../EditForms/EditCompanyForm'
import { EditUserForm } from '../EditForms/EditUserForm'
import './EditPage.css'

export const EditPage = (props) => {
  const { type } = props
  const { id } = useParams()

  return (
    <section className="edit">
      <h2 className="edit__title">
        {type === 'user' ? 'Edit profile' : 'Edit company'}
      </h2>
      {type === 'company' && <EditCompanyForm id={id} />}
      {type === 'user' && <EditUserForm />}
    </section>
  )
}
