import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrusernameMsg: '',
  }

  username = event => {
    /* console.log(event.target.value) */
    this.setState({username: event.target.value})
  }

  password = event => {
    /* console.log(event.target.value) */
    this.setState({password: event.target.value})
  }

  success = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failure = err => {
    this.setState({showErrusernameMsg: err})
  }

  submitbtn = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userdetails = {
      username,
      password,
    }

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data.jwt_token)
      this.success(data.jwt_token)
    } else {
      this.failure(data.error_msg)
    }
  }

  render() {
    const {showErrusernameMsg, username, password} = this.state

    const gettoken = Cookies.get('jwt_token')
    if (gettoken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="Finalcontainer">
        <form className="formcontainer" onSubmit={this.submitbtn}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo"
            alt=""
          />
          <div className="username-cont">
            <label className="para" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="input-box"
              value={username}
              placeholder=" Username"
              onChange={this.username}
            />
          </div>
          <div className="password-cont">
            <label className="para" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="input-box"
              placeholder=" Password"
              onChange={this.password}
            />
          </div>
          <button type="submit" className="loginbtn">
            Login
          </button>
          <p className="color">{showErrusernameMsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
