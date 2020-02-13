import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/home.component'
import Menu from './core/menu.component'
import SignUp from './user/signup.component'
import SignIn from './user/signin.component'

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
    </Switch>
  </div>
)

export default MainRouter
