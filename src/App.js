import './App.css';
import Users from './users/Users';
import User from './user/User';
import Header from './header/Header';
import Footer from './footer/Footer'
import Login from './login/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { withRouter } from 'react-router';
import { AppContext } from './lib/contextLib';

function App() {

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [location, setLocation] = useState("/users");

  const ChangeTracker = withRouter(({location}) => {
    setLocation(location.pathname);
    return false;
  })

  return (
    <>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Router>
          <Header location={location} />
          <Switch>
            <Route path="/" exact>
              <Redirect to="/users" />
            </Route>
            <Route path="/users" exact component={Users} />
            <Route path="/login" exact component={Login} />
            <Route path="/user/:id" exact component={User} />
          </Switch>
          <Footer />
          <ChangeTracker />
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
