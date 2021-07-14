import React from 'react'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom'
import Doctos from './Doctos'

const Home = () => <h1>Home Page</h1>

const Users = () => <h1>Users</h1>

const inLineStyles = {
  padding: 5
}

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Link to='/' style={inLineStyles}>Home</Link>
        <Link to='doctos' style={inLineStyles}>Doctos</Link>
        <Link to='users' style={inLineStyles}>Users</Link>
      </header>
      <Switch>
        <Route path='/doctos'>
          <Doctos />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
