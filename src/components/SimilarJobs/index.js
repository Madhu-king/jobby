import {IoBag, IoLocationOutline} from 'react-icons/io5'
import {FaStar} from 'react-icons/fa'

import './index.css'

const SimilarJobs = prop => {
  const {detailssimilar} = prop
  const {
    title,
    rating,
    imageLogoUrl,
    employmentType,
    location,
    jobDescription,
  } = detailssimilar
  console.log(detailssimilar)
  return (
    <li className="listsimilar">
      <div className="logo-section-SimilarJobs">
        <img src={imageLogoUrl} className="logo-size" />
        <div className="cont">
          <h1 className="SimilarJobs-heading">{title}</h1>
          <p className="t-color">
            <FaStar color="yellow" />
            {rating}
          </p>
        </div>
      </div>
      <div className="description">
        <h1 className="description-color">Description</h1>
        <p className="description-color">{jobDescription}</p>
      </div>
      <div className="location">
        <p className="t-color">
          <IoLocationOutline />
          {location}
        </p>
        <p className="t-color">
          <IoBag />
          {employmentType}
        </p>
      </div>
    </li>
  )
}

export default SimilarJobs
