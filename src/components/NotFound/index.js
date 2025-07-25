import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="notfoundimgsize"
      alt="not found"
    />
    <h1 className="heading">Page Not Found</h1>
    <p className="heading">
      we're sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
