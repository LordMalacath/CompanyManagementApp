import { InitialForm } from '../InitialForm/InitialForm'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import { createCompanyAction } from '../../actions/companyActions'
import { BackButton } from '../BackButton/BackButton'
import { initialValues, validationSchema } from '../common/formikData'
import './CreatePage.css'

export const CreatePage = (props) => {
  const { type } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <section className="create">
      <h2 className="create__title">
        {type === 'user' ? 'Create profile' : 'Create company'}
      </h2>
      <Formik
        initialValues={initialValues[type]}
        validationSchema={validationSchema[type]}
        onSubmit={(values) => {
          if (type === 'company') {
            dispatch(createCompanyAction(values))
            navigate(-1)
          }
        }}
      >
        <InitialForm initialValues={initialValues[type]}></InitialForm>
      </Formik>
      <BackButton />
    </section>
  )
}
