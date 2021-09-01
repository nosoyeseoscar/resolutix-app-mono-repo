import React, { useEffect, useState } from 'react'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom'
import { DoctoDetail } from './components/DoctoDetail'
import Doctos from './Doctos'
import doctoService from './services/doctos'
import Login from './Login'

const Home = () => <h1>Home Page</h1>

const Users = () => <h1>Users</h1>

// const Login = () => <h1>Login</h1>

const inLineStyles = {
  padding: 5
}

const App = () => {
  const [doctos, setDoctos] = useState([])
  useEffect(() => {
    doctoService.getAll().then(initialDoctos => { setDoctos(initialDoctos) })
  }, [])

  return (
    <BrowserRouter>
      <header>
        <Link to='/' style={inLineStyles}>Home</Link>
        <Link to='/doctos' style={inLineStyles}>Doctos</Link>
        <Link to='/users' style={inLineStyles}>Users</Link>
        <Link to='/login' style={inLineStyles}>Login</Link>
      </header>
      <Switch>
        <Route path='/doctos/:doctoId'>
          <DoctoDetail doctos={doctos} />
        </Route>
        <Route path='/doctos'>
          <Doctos />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
