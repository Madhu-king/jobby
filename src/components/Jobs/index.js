import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import EmployeeDetail from '../EmployeeDetail'

import SalaryRange from '../SalaryRange'

import ResultView from '../ResultView'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatusConstantstwo = {
  firstinitial: 'INITIAL',
  firstsuccess: 'SUCCESS',
  firstfailure: 'FAILURE',
  firstinProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    apiStatusfirst: apiStatusConstantstwo.firstinitial,
    profiledata: {},
    /* authorizeuser: false, */
    usersearchinput: '',
    showjobs: [],
    /* salaryvalue: '', */
    checkboxdata: '',
    nojobs: false,
  }

  componentDidMount() {
    this.getprofile()
    this.takejobresults()
  }

  failureview = () => (
    <div>
      <button type="button" className="Retrybtn">
        Retry
      </button>
    </div>
  )

  failureviewrightsidejobs = () => (
    <div className="nojobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="nojobs-size"
        alt="no jobs"
      />
      <h1 className="headingemploye">No Jobs Found</h1>
      <p className="failure-para">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  loaderview = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getprofile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const gettokenfromcookies = Cookies.get('jwt_token')
    /* if (gettokenfromcookies !== undefined) { */
    const apiurl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${gettokenfromcookies}`,
      },
    }

    const response = await fetch(apiurl, options)
    if (response.ok) {
      const resultprofiledata = await response.json()
      const c = this.sendformat(resultprofiledata.profile_details)
      // console.log(c)//
      // this.takejobresults()//
      this.setState({
        profiledata: c,
        /* authorizeuser: true, */
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        /* authorizeuser: false, */
        nojobs: true,
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  sendformat = data => ({
    imageUrl: data.profile_image_url,
    name: data.name,
    shortBio: data.short_bio,
  })

  searchvalue = event => {
    console.log(event.target.value)
    // const userinputvalue=event.target.value;//
    // this.takejobresults(userinputvalue)//
    this.setState({usersearchinput: event.target.value})
    // this.takejobresults(userinputvalue)//
  }

  checkboxdata = async data => {
    // this.setState({value: data})//
    // console.log(data)//
    this.setState({nojobs: false})

    const {usersearchinput} = this.state
    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${data}&search=${usersearchinput}`,
      options,
    )
    const out = await response.json()
    console.log(out)
    if (out.total === 0) {
      this.setState({nojobs: true})
    } else {
      const dataformat = out.jobs.map(eachjob => this.singlr(eachjob))
      console.log(out)
      this.setState({showjobs: dataformat, checkboxdata: data})
      // this.setState({checkboxdata: data})//

      // this.setState({checkboxvalues: data})//
      // console.log(salaryvalue)//
    }
  }

  singlr = data => ({
    imgUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerannum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  takejobresults = async () => {
    const {usersearchinput} = this.state
    this.setState({apiStatusfirst: apiStatusConstantstwo.firstinProgress})
    const token = Cookies.get('jwt_token')
    if (usersearchinput === '') {
      const apiurl = ' https://apis.ccbp.in/jobs'

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await fetch(apiurl, options)
      if (response.ok) {
        const searchingresults = await response.json()
        // console.log(searchingresults)//
        const formatdata = searchingresults.jobs.map(eachjob =>
          this.singlr(eachjob),
        )

        this.setState({
          showjobs: formatdata,
          apiStatusfirst: apiStatusConstantstwo.firstsuccess,
        })
      } else {
        this.setState({apiStatusfirst: apiStatusConstantstwo.firstfailure})
      }

      //  console.log(formatdata)//
    } else {
      // this.setState({apiStatusfirst:apiStatusConstantstwo.firstinProgress})//

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await fetch(
        `https://apis.ccbp.in/jobs?search=${usersearchinput}`,
        options,
      )
      if (response.ok) {
        const out = await response.json()
        const dataformat = out.jobs.map(eachjob => this.singlr(eachjob))
        this.setState({
          showjobs: dataformat,
          apiStatusfirst: apiStatusConstantstwo.firstsuccess,
        })
      } else {
        this.setState({apiStatusfirst: apiStatusConstantstwo.firstfailure})

        // this.rightsideshowjobs()//
      }

      // console.log(out)//
    }
  }

  /*  resutview = () => {
    const {showjobs} = this.state
  } */

  getradiodata = async salaryRangeId => {
    // console.log(salaryRangeId)//
    const {usersearchinput, checkboxdata} = this.state
    this.setState({nojobs: false})

    // this.takejobresults()//
    /* const apiurl = ' https://apis.ccbp.in/jobs' */
    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${checkboxdata}&minimum_package=${salaryRangeId}&search=${usersearchinput}`,
      options,
    )
    const out = await response.json()
    if (out.total === 0) {
      this.setState({nojobs: true})
    }
    const dataformat = out.jobs.map(eachjob => this.singlr(eachjob))
    // console.log(out)//
    this.setState({showjobs: dataformat})
  }

  // line 284:26//
  profilesec = () => {
    const {apiStatus} = this.state

    if (apiStatus === apiStatusConstants.inProgress) {
      return this.loaderview()
    }
    if (apiStatus === apiStatusConstants.success) {
      const {profiledata} = this.state
      const {imageUrl, name, shortBio} = profiledata
      return (
        <div className="profilecard">
          <img src={imageUrl} alt="profile" />
          <h1 className="profile-heading">{name}</h1>
          <p>{shortBio}</p>
        </div>
      )
    }
    if (apiStatus === apiStatusConstants.failure) {
      return this.failureview()
    }
    return undefined
  }

  // line304:33//
  rightsideshowjobs = () => {
    const {apiStatusfirst} = this.state
    if (apiStatusfirst === apiStatusConstantstwo.firstsuccess) {
      const {showjobs} = this.state
      return (
        <ul className="unorder">
          {showjobs.map(eachjob => (
            <ResultView key={eachjob.id} eachdetails={eachjob} />
          ))}
        </ul>
      )
    }
    if (apiStatusfirst === apiStatusConstantstwo.firstinProgress) {
      return this.loaderview()
    }
    if (apiStatusfirst === apiStatusConstantstwo.firstfailure) {
      return this.failureviewrightsidejobs()
    }
    return undefined
  }

  render() {
    const {
      /* profiledata, */
      showjobs,
      usersearchinput,
      /* checkboxdata, */
      nojobs,
      /* authorizeuser, */
    } = this.state
    /* const {imageUrl, name, shortBio} = profiledata */
    console.log(showjobs)
    return (
      <div className="finaljob-container">
        <Header />
        <div className="sidebarmiddle-finalcontainer">
          <div className="sidebar-container">
            <div className="searchelement-smalldevice">
              <input
                type="search"
                className="input-size"
                placeholder=" Search"
                value={usersearchinput}
                onChange={this.searchvalue}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchbtn"
                onClick={this.takejobresults}
              >
                <BsSearch size={18} />
              </button>
            </div>
            {this.profilesec()}

            <hr className="line" />
            <ul className="typeofEmployement-container">
              <h1 className="headingemploye">Type of Employement</h1>
              {employmentTypesList.map(each => (
                <EmployeeDetail
                  key={each.employmentTypeId}
                  details={each}
                  checkboxdata={this.checkboxdata}
                />
              ))}
            </ul>
            <hr className="line" />

            <ul className="salaryrange-container">
              <h1 className="headingemploye">Salary Range</h1>
              {salaryRangesList.map(each => (
                <SalaryRange
                  key={each.salaryRangeId}
                  details={each}
                  getradiodata={this.getradiodata}
                />
              ))}
            </ul>
            <div className="jobscontainer-smalldevice">
              {nojobs ? (
                <div className="nojobs-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                    className="nojobs-size"
                    alt="failure view"
                  />
                  <h1 className="headingemploye">No Jobs guys</h1>
                  <p className="failure-para">
                    We could not find any jobs. Try other filters
                  </p>
                </div>
              ) : (
                <ul className="unorder">
                  {showjobs.map(eachjob => (
                    <ResultView key={eachjob.id} eachdetails={eachjob} />
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="rightside-container">
            <div className="searchelement">
              <input
                type="search"
                className="input-size"
                placeholder=" Search"
                value={usersearchinput}
                onChange={this.searchvalue}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchbtn"
                onClick={this.takejobresults}
              >
                <BsSearch size={18} />
              </button>
            </div>
            {this.rightsideshowjobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
