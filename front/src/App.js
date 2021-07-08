import './App.css'

// components
import DocumentList from './components/documentList'
import LoginForm from './components/LoginForm'
import SearchDocto from './components/SearchDocto'
import DoctoForm from './components/formDocto'
import Notification from './components/Notification'

// import axios from 'axios'
import doctoService from './services/doctos'
import loginService from './services/login'

/* Hooks */
import { useState, useEffect } from 'react'

function App () {
  const [doctos, setDoctos] = useState([])
  // const [search, SetSearch] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)

  /* const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('') */
  const [user, setUser] = useState(null)

  // useEffect para recuperar todos los doctos.
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

  const handleLogout = () => {
    setUser(null)
    doctoService.setToken(user.token)
    window.localStorage.removeItem('loggedDoctoAppUser')
  }

  /*  const handleInputChange = (event) => {
    SetSearch(event.target.value)
  } */

  const addDocto = (doctoObject) => {
    doctoService
      .create(doctoObject)
      .then(returnedDocto => {
        setDoctos(doctos.concat(returnedDocto))
      })
  }

  const handleLogin = async (userName, password) => {
    try {
      const currentUser = await loginService.login({
        userName,
        password
      })

      window.localStorage.setItem(
        'loggedDoctoAppUser', JSON.stringify(currentUser)
      )

      doctoService.setToken(currentUser.token)

      setUser(currentUser)
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className='App'>
      <h1>Oficios Delegacion BCS</h1>

      <Notification message={errorMessage} />
      <SearchDocto />
      <hr />
      {
        user
          ? <DoctoForm addDocto={addDocto} logoutUser={handleLogout} />
          : <LoginForm handleLogin={handleLogin} />
      }

      <DocumentList docs={doctos} />
    </div>
  )
}

export default App
