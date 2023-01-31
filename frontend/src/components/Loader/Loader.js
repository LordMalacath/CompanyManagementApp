import './Loader.css'

export const Loader = (props) => {
  return (
    <div className={`loader ${props.shifted && 'shifted'}`}>
      <div className="loader__container">
        <span className="loader__spinner"></span>
      </div>
    </div>
  )
}
