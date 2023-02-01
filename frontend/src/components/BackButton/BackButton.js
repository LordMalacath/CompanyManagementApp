import { useNavigate } from 'react-router-dom'
import { ReactComponent as ReactBackArrow } from '../../assets/img/backArrow.svg'
import './BackButton.css'

export const BackButton = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <button onClick={goBack} className="back-button">
      <ReactBackArrow />
    </button>
  )
}
