import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoginPage from './components/LoginPage'

import HomePage from './components/HomePage'

import JobsPage from './components/JobsPage'

import JobsItemsDetails from './components/JobsItemsDetails'

import ProtectedRoute from './components/ProtectedRoute'

import NotFound from './components/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.
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

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={HomePage} />
      <ProtectedRoute exact path="/jobs" component={JobsPage} />
      <ProtectedRoute
        exact
        path="/jobdetails/:id"
        component={JobsItemsDetails}
      />
      <Route path="/not-found" component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
