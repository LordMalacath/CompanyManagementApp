import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SignInForm } from '../SignForms/SignInForm'
import { SignUpForm } from '../SignForms/SignUpForm'
import { Loader } from '../Loader/Loader'
import { ReactComponent as ReactLogo } from '../../assets/img/logo.svg'
import 'react-toastify/dist/ReactToastify.css'
import './SignPage.css'

export const SignPage = (props) => {
  const { type } = props
  const isLoading = useSelector((state) => state.page.isLoading)
  return (
    <div className="sign__wrapper">
      {isLoading && <Loader />}
      <div className="sign">
        <div className="sign__header">
          <div className="sign__header-logo">
            <ReactLogo />
          </div>
          <h1 className="sign__header-title">Company Management</h1>
        </div>
        {/*The Sign In and Sign Up forms are separate elements to prevent the warning: 
        'A component is changing an uncontrolled input of type text to be controlled...*/}
        {type === 'signin' && <SignInForm />}
        {type === 'signup' && <SignUpForm />}
        <p className="sign__redirect">
          {type === 'signup' && (
            <>
              Already have an account? <Link to="/signin">Sign In</Link>
            </>
          )}
          {type === 'signin' && (
            <>
              Don't have an account yet? <Link to="/signup">Sign Up</Link>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
