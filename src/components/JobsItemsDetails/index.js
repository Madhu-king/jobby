import {Component} from 'react'

import {IoLocationOutline, IoBag} from 'react-icons/io5'

import Cookies from 'js-cookie'

import Header from '../Header'

import SkillsShow from '../SkillsShow'

import SimilarJobs from '../SimilarJobs'

import './index.css'

/* const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
} */

class JobsItemsDetails extends Component {
  state = {
    jobdetails: {},
    skills: [],
    companylifedetails: {},
    similarjobs: [],
    detailsview: false,
  }

  componentDidMount() {
    this.getdetailsdata()
  }

  dataformatdisplayui = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    id: data.id,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    title: data.title,
    rating: data.rating,
    location: data.location,
    packageSalary: data.package_per_annum,
    company: data.life_at_company,
  })

  skillsformat = data => ({
    name: data.name,
    imageUrl: data.image_url,
  })

  lifeatcomapny = data => ({
    description: data.description,
    imageUrl: data.image_url,
  })

  similarjobsfun = each => ({
    imageLogoUrl: each.company_logo_url,
    employmentType: each.employment_type,
    title: each.title,
    id: each.id,
    location: each.location,
    rating: each.rating,
    jobDescription: each.job_description,
  })

  failureview = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button">Retry</button>
    </div>
  )

  getdetailsdata = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const token = Cookies.get('jwt_token')
    const apiurl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiurl, options)
    console.log(response)
    if (response.ok) {
      const resultdetails = await response.json()
      // console.log(resultdetails.job_details)//

      // console.log(resultdetails.similar_jobs)//
      const c = resultdetails.job_details
      const formatteddata = this.dataformatdisplayui(c)
      const e = resultdetails.similar_jobs
      const similarjobsFormatted = e.map(each => this.similarjobsfun(each))
      console.log(similarjobsFormatted)
      // console.log(resultdetails.job_details)//
      const getskillsdata = c.skills
      const lifeatcomapny = c.life_at_company
      const lifecomapnyformatted = this.lifeatcomapny(lifeatcomapny)
      // console.log(lifecomapnyformatted)//
      const d = getskillsdata.map(each => this.skillsformat(each))
      // console.log(getskillsdata)//
      // console.log(d)//
      this.setState({
        jobdetails: formatteddata,
        skills: d,
        companylifedetails: lifecomapnyformatted,
        similarjobs: similarjobsFormatted,
        detailsview: true,
      })
    } else {
      const {history} = this.props
      Cookies.remove('jwt_token')
      history.replace('/login')

      this.setState({detailsview: false})
    }
  }

  render() {
    const {
      jobdetails,
      skills,
      companylifedetails,
      similarjobs,
      detailsview,
    } = this.state
    const {description, imageUrl} = companylifedetails
    const {
      id,
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packageSalary,
      jobDescription,
      companyWebsiteUrl,
    } = jobdetails
    return (
      <div className="jobsdetails-container">
        <Header />
        {detailsview && (
          <div className="container-align">
            <div className="jobcontainer" value={id}>
              <div className="logo-section">
                <img
                  alt="website logo"
                  src={companyLogoUrl}
                  className="size-logo"
                />

                <div>
                  <h1 className="heading-color">{title}</h1>
                  <p className="heading-color">{rating}</p>
                </div>
              </div>

              <div className="location-section">
                <p className="location-color">
                  <IoLocationOutline size={25} className="color" />
                  {location}
                </p>
                <p className="internship">
                  <IoBag size={25} className="color" />
                  {employmentType}
                </p>

                <p className="package">{packageSalary}</p>
              </div>
              <hr className="line-job" />
              <div className="des-section">
                <div className="des-align">
                  <h1 className="package">Description</h1>
                  <a href={companyWebsiteUrl} className="visitlink">
                    Visit
                  </a>
                </div>

                <p className="package">{jobDescription}</p>
              </div>
              <div className="skill-section">
                <h1 className="skills-head">Skills </h1>
                <ul className="skill-unorder-container">
                  {skills.map(each => (
                    <SkillsShow eachdetails={each} key={each.id} />
                  ))}
                </ul>
              </div>
              <div className="life-atcompany">
                <h1 className="skills-head">Life at Company</h1>
                <div className="arrangecompany">
                  <p className="life-para">{description}</p>
                  <img
                    src={imageUrl}
                    className="companyimagesize"
                    alt="life at company"
                  />
                </div>
              </div>
              <div className="similarjobs-container">
                <h1 className="skills-head">Similar Jobs</h1>
                <ul className="unorder-similar">
                  {similarjobs.map(each => (
                    <SimilarJobs key={each.id} detailssimilar={each} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default JobsItemsDetails
