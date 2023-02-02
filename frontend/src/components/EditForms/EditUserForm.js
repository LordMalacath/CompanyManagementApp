import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { InitialForm } from '../InitialForm/InitialForm'
import { initialValues, validationSchema } from '../common/formikData'
import { editUserAction, editProfileAction } from '../../actions/userActions'

export const EditUserForm = (props) => {
  const { id, valuesToFill } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user)
  const editType = +id === +currentUser.id ? 'profile' : 'user'
  const filledValues = {}
  for (const key in initialValues.user) {
    filledValues[key] = valuesToFill[key]
  }

  return (
    <Formik
      initialValues={filledValues}
      validationSchema={validationSchema.user}
      onSubmit={(values) => {
        editType === 'profile' && dispatch(editProfileAction(id, values))
        editType === 'user' && dispatch(editUserAction(id, values))
        navigate(-1)
      }}
    >
      <InitialForm initialValues={filledValues}></InitialForm>
    </Formik>
  )
}
