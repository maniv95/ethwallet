import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import CreateAccount from './CreateAccount'
import Login from './Login'
import SendTx from './SendTx'
import SendEntireBal from './SendEntireBal'
import GetTxDetails from './GetTxDetails'
import GetTxByAdd from './GetTxByAdd'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/CreateAccount' component={CreateAccount}/>
      <Route path='/ViewAccount' component={Login}/>
      <Route path='/SendEth' component={SendTx}/>
      <Route path='/SendAllEth' component={SendEntireBal}/>
      <Route path='/GetByTxHash' component={GetTxDetails}/>
      <Route path='/GetByAddress' component={GetTxByAdd}/>
    </Switch>
  </main>
)

export default Main;
