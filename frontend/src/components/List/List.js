import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { formatTheField } from '../../utils/formatTheField'
import { ReactComponent as ReactPlusIcon } from '../../assets/img/plusIcon.svg'
import { useEffect } from 'react'
import { getCompaniesAction } from '../../actions/companyActions'
import './List.css'

const values = {
  user: { title: 'last_name', fields: ['email', 'phone_number', 'position'] },
  company: {
    title: 'name',
    fields: ['service_of_activity', 'address', 'number_of_employees', 'type'],
  },
}

export const List = (props) => {
  const role = useSelector((state) => state.user.role)
  const { type } = props
  const dispatch = useDispatch()
  const renderData = useSelector((state) =>
    role === 'Admin' ? state.admin.companies : state.user.company,
  )

  useEffect(() => {
    if (renderData.length <= 0 && role === 'Admin') {
      dispatch(getCompaniesAction(role))
    }
  }, [])

  return (
    <section className="list">
      <h2 className="list__title">My companies</h2>
      <ul className="list__items">
        {renderData.map((item) => (
          <Link to={`company/:${item.id}`} key={item.id}>
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
        <li className="list__add">
          {role !== 'Admin' && (
            <Link to={`company/new`}>
              <ReactPlusIcon />
            </Link>
          )}
        </li>
      </ul>
    </section>
  )
}
