import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { InitialForm } from '../InitialForm/InitialForm'
import { initialValues, validationSchema } from '../common/formikData'
import { createNewPasswordAction } from '../../actions/userActions'

export const EditPasswordForm = (props) => {
  const { id } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Formik
      initialValues={initialValues.password}
      validationSchema={validationSchema.password}
      onSubmit={(values) => {
        dispatch(createNewPasswordAction(id, values.new_password))
        navigate(-1)
      }}
    >
      <InitialForm initialValues={initialValues.password}></InitialForm>
    </Formik>
  )
}
