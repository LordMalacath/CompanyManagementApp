import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { SignForm } from './SignForm'
import { initialValues, validationSchema } from '../common/formikData'
import { registerUserAction } from '../../actions/authActions'
/*The Sign In and Sign Up forms are separate elements to prevent the warning: 
'A component is changing an uncontrolled input of type text to be controlled...*/
export const SignUpForm = () => {
  const dispatch = useDispatch()
  return (
    <Formik
      initialValues={initialValues.signup}
      validationSchema={validationSchema.signup}
      onSubmit={(values) => {
        values.role = values.role === true ? 'Admin' : 'User'
        dispatch(registerUserAction(values))
      }}
    >
      <SignForm initialValues={initialValues.signup} type={'signup'}></SignForm>
    </Formik>
  )
}
