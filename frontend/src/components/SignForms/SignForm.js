import { Field, Form, ErrorMessage } from 'formik'
import { formatTheField } from '../../utils/formatTheField'
import './SignForm.css'

export const SignForm = (props) => {
  const { initialValues, type } = props

  return (
    <Form className="sign__form">
      <h2 className={'sign__form-title'}>
        {type === 'signin' ? 'Sign in' : 'Sign up'}
      </h2>
      {Object.keys(initialValues).map((field, i) => (
        <div key={field + i} className={`sign__field ${field}`}>
          <label className="sign__label" htmlFor={field}>
            {field === 'role' ? 'Admin' : formatTheField(field)}:
          </label>
          <Field
            className="sign__input"
            name={field}
            id={field}
            type={
              field === 'email'
                ? 'email'
                : field === 'password'
                ? 'password'
                : field === 'role'
                ? 'checkbox'
                : 'text'
            }
          />
          <div className="sign__field-error">
            <ErrorMessage name={field} />
          </div>
        </div>
      ))}
      <button type="submit" className="sign__submit">
        Submit
      </button>
    </Form>
  )
}
