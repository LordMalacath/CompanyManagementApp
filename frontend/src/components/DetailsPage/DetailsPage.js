import { useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DetailsList } from '../DetailsList/DetailsList'
import './DetailsPage.css'

export const DetailsPage = (props) => {
  const { id } = useParams()
  const { type } = props
  const role = useSelector((state) => state.user.role)
  const companies = useSelector((state) =>
    role === 'Admin' ? state.admin.companies : state.user.company,
  )
  const renderData = useSelector((state) =>
    type === 'company'
      ? companies.find((company) => `:${company.id}` === id)
      : state.user,
  )

  if (!renderData) return <Navigate to="/" replace />

  return (
    <section className="details">
      <h2 className="details__title">
        {type === 'user' ? 'My profile' : `${renderData.name}`}
      </h2>
      <DetailsList
        type={type}
        renderData={renderData}
        id={id.replace(':', '')}
      ></DetailsList>
    </section>
  )
}
