import React from 'react'
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { DoctoDetail } from './components/DoctoDetail'
// Components
import Doctos from './Doctos'
import Login from './Login'
// Hooks
import { useUser } from './hooks/useUser'
import { useDoctos } from './hooks/useDoctos'
// Material UI Components
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import { Button, IconButton, Toolbar } from '@material-ui/core'

const Home = () => <h1>Home Page</h1>

const Users = () => <h1>Users</h1>

const inLineStyles = {
  padding: 5
}

const LinkButton = props => <Button color='inherit' component={Link} {...props} />

const App = () => {
  const { doctos } = useDoctos()
  const { user } = useUser()

  return (
    <BrowserRouter>
      <Container>
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='menu' />
            <header>
              <LinkButton to='/'>
                Home
              </LinkButton>
              <LinkButton to='/doctos'>
                Doctos
              </LinkButton>
              <LinkButton to='/users'>
                Users
                {
                    user
                      ? <em>Logged as {user.name}</em>
                      : (<LinkButton to='/login'>Login</LinkButton>)
                }
              </LinkButton>
            </header>
          </Toolbar>
        </AppBar>
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
      </Container>
    </BrowserRouter>
  )
}

export default App
