import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logbtn = () => {
    const {history} = props
    console.log(history)
    Cookies.remove('jt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-cont">
      <li className="list-logo">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo-size"
            alt="website logo"
          />
        </Link>
      </li>

      <ul className="name-link">
        <li className="list">
          <Link to="/" className="para-list">
            Home
          </Link>
        </li>

        <li className="list">
          <Link to="/jobs" className="para-list">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" className="logoutbtn" onClick={logbtn}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
