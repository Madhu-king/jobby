import './index.css'

const EmployeeDetail = props => {
  const {details, checkboxdata} = props
  const {label, employmentTypeId} = details

  const sendingcheckboxdetail = () => {
    // console.log(employmentTypeId)//
    checkboxdata(employmentTypeId)
  }

  return (
    <li className="list">
      <input
        type="checkbox"
        id={label}
        className="checkbox-size"
        onChange={sendingcheckboxdetail}
      />
      <label className="label-color" htmlFor={label}>
        {label}
      </label>
    </li>
  )
}

export default EmployeeDetail
