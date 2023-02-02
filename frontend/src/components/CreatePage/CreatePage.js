import { InitialForm } from '../InitialForm/InitialForm'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik } from 'formik'
import { createCompanyAction } from '../../actions/companyActions'
import { createNewPasswordAction } from '../../actions/userActions'
import { BackButton } from '../BackButton/BackButton'
import { initialValues, validationSchema } from '../common/formikData'
import './CreatePage.css'

export const CreatePage = (props) => {
  const { type } = props
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <section className="create">
      <h2 className="create__title">
        {type === 'password' ? 'Create new password' : 'Create company'}
      </h2>
      <Formik
        initialValues={initialValues[type]}
        validationSchema={validationSchema[type]}
        onSubmit={(values) => {
          if (type === 'company') {
            dispatch(createCompanyAction(values))
          } else if (type === 'password') {
            dispatch(createNewPasswordAction(id, values.new_password))
          }
          navigate(-1)
        }}
      >
        <InitialForm initialValues={initialValues[type]}></InitialForm>
      </Formik>
      <BackButton />
    </section>
  )
}
