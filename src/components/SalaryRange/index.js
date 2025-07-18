import './index.css'

const SalaryRange = props => {
  const {details, getradiodata} = props
  const {salaryRangeId, label} = details
  const labelvalue = label.slice(0, 6)
  // console.log(labelvalue)//

  const sendradio = () => {
    // console.log(labelvalue);//
    getradiodata(salaryRangeId)
  }

  return (
    <li className="list">
      <input
        type="radio"
        id={salaryRangeId}
        name="top"
        className="radiosize"
        value={label}
        onChange={sendradio}
      />
      <label className="color-label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
