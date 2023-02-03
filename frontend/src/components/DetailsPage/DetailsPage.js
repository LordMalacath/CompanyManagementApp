import { Link, useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DetailsList } from '../DetailsList/DetailsList'
import { BackButton } from '../BackButton/BackButton'
import { ReactComponent as ReactProfileIcon } from '../../assets/img/profileIcon.svg'
import { findById } from '../../utils/findById'
import './DetailsPage.css'

export const DetailsPage = (props) => {
  const { id } = useParams()
  const { type } = props
  const userId = useSelector((state) => state.user.id)
  const role = useSelector((state) => state.user.role)
  const stateData = useSelector((state) => ({
    company: state.companies,
    user: role === 'Admin' ? state.admin.users : [state.user],
  }))
  const renderData = findById(stateData[type], id)

  if (!renderData) return <Navigate to="/" replace />

  return (
    <section className="details">
      <h2 className="details__title">
        {type === 'company'
          ? `${renderData.name}`
          : +userId === +renderData.id
          ? 'My profile'
          : `${renderData.first_name}'s profile`}
      </h2>
      {role === 'Admin' && type === 'company' && (
        <Link to={`/user/${renderData.user}`} className="details__owner">
          <div>
            <ReactProfileIcon />
          </div>
          {renderData.name} owner
        </Link>
      )}
      <DetailsList type={type} renderData={renderData} id={id}></DetailsList>
      {userId !== renderData.id && <BackButton />}
    </section>
  )
}
