import './index.css'

const SkillsShow = props => {
  console.log(props)
  const {eachdetails, key} = props
  const {name, imageUrl} = eachdetails
  return (
    <li className="list-skills" id={key}>
      <img src={imageUrl} className="image-size" alt={name} />
      <p className="para-skills">{name}</p>
    </li>
  )
}

export default SkillsShow
