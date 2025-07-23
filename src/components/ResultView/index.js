import {Link} from 'react-router-dom'

import './index.css'

import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import {IoBagRemoveSharp} from 'react-icons/io5'

const ResultView = prop => {
  const {eachdetails} = prop
  const {
    imgUrl,
    title,
    location,
    rating,
    id,
    jobDescription,
    employmentType,
    packagePerannum,
  } = eachdetails
  // console.log(eachdetails.id)//

  /* const showdetails = () => {
    console.log(eachdetails)
  } */

  return (
    <Link to={`/jobdetails/${id}`}>
      <li className="results-container">
        <div className="align">
          <img src={imgUrl} className="logo-size" alt="website logo" />
          <div className="cont">
            <h1 className="para">{title}</h1>
            <div className="para-rating">
              <p>
                <FaStar color="yellow" />
                {rating}
              </p>
            </div>
          </div>
        </div>

        <div className="middle-section">
          <div className="locationarrange">
            <p className="para-location">
              <MdLocationOn size={20} />
              {location}
            </p>

            <div className="locationarrange">
              <p className="para-location">
                <IoBagRemoveSharp size={20} />
                {employmentType}
              </p>
            </div>
          </div>

          <div className="locationarrange">
            <p className="package">{packagePerannum}</p>
          </div>
        </div>

        <hr className="hrline" />

        <div className="des-container">
          <h1 className="des">Description</h1>
          <p className="des">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default ResultView
