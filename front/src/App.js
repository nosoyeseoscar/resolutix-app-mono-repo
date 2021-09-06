import React from 'react'
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { DoctoDetail } from './components/DoctoDetail'
// Components
import Doctos from './Doctos'
import Login from './Login'
import { StyledLink } from './components/StyledLink'

// Hooks
import { useUser } from './hooks/useUser'
import { useDoctos } from './hooks/useDoctos'

const Home = () => <h1>Home Page</h1>

const Users = () => <h1>Users</h1>

const inLineStyles = {
  padding: 5
}

const App = () => {
  const { doctos } = useDoctos()
  const { user } = useUser()

  return (
    <BrowserRouter>
      <header>
        <StyledLink to='/' style={inLineStyles}>Home</StyledLink>
        <StyledLink to='/doctos' style={inLineStyles}>Doctos</StyledLink>
        <StyledLink to='/users' style={inLineStyles}>Users</StyledLink>
        {
          user
            ? <em>Logged as {user.name}</em>
            : <StyledLink to='/login' style={inLineStyles}>Login</StyledLink>
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
            return user ? <Redirect to='/' /> : <Login />
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
