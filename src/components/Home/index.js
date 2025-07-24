import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class Home extends Component {
  /* logbtn = () => {
    const {history} = this.props
    console.log(history)
    Cookies.remove('jt_token')
    history.replace('/login')
  } */

  Jobspage = () => {
    const {history} = this.props
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      history.replace('/jobs')
    }
    return undefined
  }

  render() {
    return (
      <div className="final">
        <div className="outsidecontainer">
          <Header />
          <div>
            <div>
              <div>
                <h1 className="heading-des">
                  Find The Job That Fits Your Life
                </h1>
                <p className="para-des">
                  Millions of people are searching for
                  jobs,salary,information,company reviews.Find the job Fits your
                  abilites & potential
                </p>
              </div>
              <button
                type="button"
                className="find-jobs"
                onClick={this.Jobspage}
              >
                <Link to="/jobs">Find Jobs</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
