import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoginPage from './components/LoginPage'

import HomePage from './components/HomePage'

import JobsPage from './components/JobsPage'

import JobsItemsDetails from './components/JobsItemsDetails'

import ProtectedRoute from './components/ProtectedRoute'

import NotFound from './components/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

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
