import { Link } from "react-router-dom"
function OptionCards({imgUrl, title, to}) {
  return (
    <Link to={to}>
      <div className='card'>
          <img src={imgUrl} alt={title} />
          <h3>
              {title}
          </h3>
      </div>
    </Link>
  )
}

export default OptionCards