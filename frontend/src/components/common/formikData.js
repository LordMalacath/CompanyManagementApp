import * as Yup from 'yup'

export const initialValues = {
  company: {
    name: '',
    service_of_activity: '',
    address: '',
    number_of_employees: '',
    type: '',
  },
  user: {
    first_name: '',
    last_name: '',
    nick_name: '',
    email: '',
    phone_number: '',
    description: '',
    position: '',
  },
  signin: { email: '', password: '' },
  signup: {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    nick_name: '',
    phone_number: '',
    description: '',
    position: '',
    role: '',
  },
}

export const validationSchema = {
  company: Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    service_of_activity: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    address: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    number_of_employees: Yup.number()
      .max(999999, 'Must be 6 characters or less')
      .typeError('Only numbers allowed')
      .required('Required'),
    type: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
  }),
  user: Yup.object({
    first_name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    last_name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    nick_name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    email: Yup.string()
      .max(35, 'Must be 15 characters or less')
      .required('Required'),
    phone_number: Yup.number()
      .typeError('Only numbers allowed')
      .required('Required'),
    description: Yup.string()
      .max(55, 'Must be 55 characters or less')
      .required('Required'),
    position: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
  }),
  signin: Yup.object({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  }),
  signup: Yup.object({
    first_name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    last_name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    nick_name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    email: Yup.string()
      .max(35, 'Must be 15 characters or less')
      .required('Required'),
    password: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    phone_number: Yup.number()
      .typeError('Only numbers allowed')
      .required('Required'),
    description: Yup.string()
      .max(55, 'Must be 55 characters or less')
      .required('Required'),
    position: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
  }),
}
