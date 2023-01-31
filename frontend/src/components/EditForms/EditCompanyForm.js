import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { InitialForm } from '../InitialForm/InitialForm'
import { initialValues, validationSchema } from '../common/formikData'
import { editCompanyAction } from '../../actions/companyActions'

export const EditCompanyForm = (props) => {
  const { id } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const role = useSelector((state) => state.user.role)
  const companies = useSelector((state) =>
    role === 'Admin' ? state.admin.companies : state.user.company,
  )
  const valuesToFill = companies.find((company) => `:${company.id}` === id)
  const filledValues = {}

  if (!valuesToFill) return <Navigate to="/" replace />

  for (const key in initialValues.company) {
    filledValues[key] = valuesToFill[key]
  }

  return (
    <Formik
      initialValues={filledValues}
      validationSchema={validationSchema.company}
      onSubmit={(values) => {
        dispatch(editCompanyAction(id.replace(':', ''), values, role))
        navigate(-1)
      }}
    >
      <InitialForm initialValues={filledValues}></InitialForm>
    </Formik>
  )
}
