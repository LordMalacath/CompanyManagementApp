import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { SignForm } from './SignForm'
import { initialValues, validationSchema } from '../common/formikData'
import { authorizeUserAction } from '../../actions/authActions'
/*The Sign In and Sign Up forms are separate elements to prevent the warning: 
'A component is changing an uncontrolled input of type text to be controlled...*/
export const SignInForm = () => {
  const dispatch = useDispatch()
  return (
    <Formik
      initialValues={initialValues.signin}
      validationSchema={validationSchema.signin}
      onSubmit={(values) => dispatch(authorizeUserAction(values))}
    >
      <SignForm initialValues={initialValues.signin} type={'signin'}></SignForm>
    </Formik>
  )
}
