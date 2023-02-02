import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { formatTheField } from '../../utils/formatTheField'
import { ReactComponent as ReactPlusIcon } from '../../assets/img/plusIcon.svg'
import './List.css'

const values = {
  user: {
    title: 'first_name',
    fields: ['last_name', 'email', 'phone_number', 'position'],
  },
  company: {
    title: 'name',
    fields: ['service_of_activity', 'address', 'number_of_employees', 'type'],
  },
}

export const List = (props) => {
  const role = useSelector((state) => state.user.role)
  const { type } = props
  const stateData = useSelector((state) => ({
    company: state.companies,
    user:
      role === 'Admin'
        ? state.admin.users.filter((user) => user.id !== state.user.id)
        : [],
  }))
  const renderData = stateData[type]

  return (
    <section className="list">
      <h2 className="list__title">
        {type === 'user'
          ? 'User list'
          : role === 'Admin'
          ? 'Companies list'
          : 'My companies'}
      </h2>
      <ul className="list__items">
        {renderData.map((item) => (
          <Link to={`/${type}/${item.id}`} key={item.id}>
            <li className="list__item">
              <div className="list__item-title">
                <span>{formatTheField(values[type].title)}:</span>
                <h3>{item[values[type].title]}</h3>
              </div>
              <div className="list__item-info-wrapper">
                {values[type].fields.map((field, i) => (
                  <div key={field + i} className="list__item-info">
                    <span>{formatTheField(field)}:</span>
                    <p>{item[field]}</p>
                  </div>
                ))}
              </div>
            </li>
          </Link>
        ))}
        {role !== 'Admin' && (
          <li className="list__add">
            <Link to={`company/new`}>
              <ReactPlusIcon />
            </Link>
          </li>
        )}
      </ul>
    </section>
  )
}
