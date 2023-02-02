import { Field, Form, ErrorMessage } from 'formik'
import { formatTheField } from '../../utils/formatTheField'
import './InitialForm.css'

export const InitialForm = (props) => {
  const { initialValues } = props

  return (
    <Form className="form">
      {Object.keys(initialValues).map((field, i) => (
        <div key={field + i} className="form__field">
          <label className="form__label" htmlFor={field}>
            {formatTheField(field)}:
          </label>
          <Field
            className="form__input"
            name={field}
            id={field}
            type={
              field === 'email'
                ? 'email'
                : field.match(/password/gi)
                ? 'password'
                : 'text'
            }
          />
          <div className="form__field-error">
            <ErrorMessage name={field} />
          </div>
        </div>
      ))}
      <button type="submit" className="form__button">
        Submit
      </button>
    </Form>
  )
}
