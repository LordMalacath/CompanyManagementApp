import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { InitialForm } from '../InitialForm/InitialForm'
import { initialValues, validationSchema } from '../common/formikData'
import { editUserAction } from '../../actions/userActions'

export const EditUserForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const valuesToFill = useSelector((state) => state.user)
  const filledValues = {}

  if (!valuesToFill) return <Navigate to="/" replace />

  for (const key in initialValues.user) {
    filledValues[key] = valuesToFill[key]
  }

  return (
    <Formik
      initialValues={filledValues}
      validationSchema={validationSchema.user}
      onSubmit={(values) => {
        dispatch(editUserAction(values))
        navigate(-1)
      }}
    >
      <InitialForm initialValues={filledValues}></InitialForm>
    </Formik>
  )
}
