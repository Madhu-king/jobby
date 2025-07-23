import './index.css'

const SkillsShow = props => {
  console.log(props)
  const {eachdetails} = props
  const {name, imageUrl} = eachdetails
  return (
    <li className="list-skills">
      <img src={imageUrl} className="image-size" alt="" />
      <p className="para-skills">{name}</p>
    </li>
  )
}

export default SkillsShow
