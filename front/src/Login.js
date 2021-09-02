import { useState } from 'react'
import { useHistory } from 'react-router'

// Components
import LoginForm from './components/LoginForm'

// Services from axios
import loginService from './services/login'
import doctoService from './services/doctos'

export default function Login () {
  const history = useHistory()
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    console.log('el usuario es: ' + userName)
    event.preventDefault()
    try {
      const user = await loginService.login({
        userName,
        password
      })

      window.localStorage.setItem(
        'loggedDoctoAppUser', JSON.stringify(user)
      )

      doctoService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      // go to home when login
      history.push('/doctos')
    } catch (error) {
      // console.log(JSON.stringify(error))
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (errorMessage) return <p>{errorMessage}</p> // Return Only Error Message

  if (user) return <p>User is logged!!</p> // Return Only when user is logged.

  return (
    <LoginForm
      username={userName}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )
}
