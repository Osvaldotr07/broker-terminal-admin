import React from 'react';
import './app.scss'
//Components
import Home from './Containers/Home'
import LandingPage from './Containers/LandingPage'
import Footer from './Components/Footer'
import FormLanding from './Containers/FormLanding'
import FormTableWrapper from './Containers/FormTableWrapper'
import { Navbar } from './Components/Navbar'
import Statistics from './Containers/StaticsContainer'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Error404 from './Containers/Error404'
import LoginPage from './Containers/LoginPage'
import RegisterPage from './Containers/RegisterPage'
import EditForm from './Containers/EditForm'
import PrivateRoute from './Containers/PrivateRoute'
import { connect } from 'react-redux'
import SideBar from './Components/SideBar'

const App = ({isLogged, email}) => {
  return (
    <div style={{position: 'relative'}}>
      <Router>
      {
        !isLogged ? 
          <Navbar isLogged={isLogged}/>
        :
        <SideBar isLogged={isLogged} />
      }
        <Switch>
          <Route path="/" component={Home} exact />
          <PrivateRoute path="/init" exact component={LandingPage} isLogged={isLogged}/>
          {/* <PrivateRoute path='/form' exact component={FormLanding} isLogged={isLogged}/> */}
          <PrivateRoute path="/myforms" exact component={FormTableWrapper} isLogged={isLogged}/>
          <PrivateRoute path="/edit" exact component={FormLanding} isLogged={isLogged}/>
          <PrivateRoute path="/statistics" exact component={Statistics} isLogged={isLogged}/>
          <Route path="/login" exact component={isLogged ? LandingPage : LoginPage} />
          <Route path="/register" exact component={isLogged ? LandingPage : RegisterPage} />
          <Route component={Error404}/>
        </Switch>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogged: (state.data ? state.data.user : undefined),
  }
}

export default connect(mapStateToProps, null)(App);
