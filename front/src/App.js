import React from 'react'
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { DoctoDetail } from './components/DoctoDetail'
// Components
import Doctos from './Doctos'
import Login from './Login'
// Hooks
import { useUser } from './hooks/useUser'
import { useDoctos } from './hooks/useDoctos'
// Bootstrap Components

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
      <div className='container'>
        <nav>
          <Link to='/' style={inLineStyles}>Home</Link>
          <Link to='/doctos' style={inLineStyles}>Doctos</Link>
          <Link to='/users' style={inLineStyles}>Users</Link>
          {
                    user
                      ? <em>Logged as {user.name}</em>
                      : (<Link to='/login' style={inLineStyles}>Login</Link>)
                }
        </nav>
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
      </div>
    </BrowserRouter>
  )
}

export default App
