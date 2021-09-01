import React, { useEffect, useState } from 'react'
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
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
  const [user, setUser] = useState(null)

  useEffect(() => {
    doctoService.getAll().then(initialDoctos => { setDoctos(initialDoctos) })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedDoctoAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      doctoService.setToken(user.token)
    }
  }, [])

  return (
    <BrowserRouter>
      <header>
        <Link to='/' style={inLineStyles}>Home</Link>
        <Link to='/doctos' style={inLineStyles}>Doctos</Link>
        <Link to='/users' style={inLineStyles}>Users</Link>
        {
          user
            ? <em>Logged as {user.name}</em>
            : <Link to='/login' style={inLineStyles}>Login</Link>
        }
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
        <Route
          path='/login' render={() => {
            return <Redirect to='/' /> ? null : <Login />
          }}
        />
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
