import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { InitialForm } from '../InitialForm/InitialForm'
import { initialValues, validationSchema } from '../common/formikData'
import { editCompanyAction } from '../../actions/companyActions'

export const EditCompanyForm = (props) => {
  const { id, valuesToFill } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const role = useSelector((state) => state.user.role)
  const filledValues = {}

  for (const key in initialValues.company) {
    filledValues[key] = valuesToFill[key]
  }

  return (
    <Formik
      initialValues={filledValues}
      validationSchema={validationSchema.company}
      onSubmit={(values) => {
        dispatch(editCompanyAction(id, values, role))
        navigate(-1)
      }}
    >
      <InitialForm initialValues={filledValues}></InitialForm>
    </Formik>
  )
}
