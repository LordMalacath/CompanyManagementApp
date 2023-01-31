import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteCompanyAction } from '../../actions/companyActions'
import { deleteUserAction } from '../../actions/userActions'
import { formatTheField } from '../../utils/formatTheField'
import './DetailsList.css'

const values = {
  user: [
    'first_name',
    'last_name',
    'nick_name',
    'email',
    'phone_number',
    'description',
    'position',
  ],
  company: [
    'name',
    'service_of_activity',
    'address',
    'number_of_employees',
    'type',
  ],
}

export const DetailsList = (props) => {
  const { type, renderData, id } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onDeleteBtnClick = () => {
    navigate(-1)
    type === 'company' && dispatch(deleteCompanyAction(id))
    type === 'user' && dispatch(deleteUserAction())
  }

  return (
    <div className="details-list">
      <div className="details-list__container">
        {values[type].map((field, i) => (
          <div key={i + field} className="details-list__field">
            <div className="details-list__label">{formatTheField(field)}:</div>
            <div className="details-list__value">{renderData[field]}</div>
          </div>
        ))}
      </div>
      <div className="details-list__buttons">
        <Link to={`edit`} className="details-list__button">
          Edit
        </Link>
        <button
          onClick={onDeleteBtnClick}
          className="details-list__button details-list__button_delete"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
