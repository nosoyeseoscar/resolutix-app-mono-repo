import { useState } from 'react'

// Components
import LoginForm from './components/LoginForm'

// Services from axios
import loginService from './services/login'
import doctoService from './services/doctos'

export default function Login () {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
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
    } catch (error) {
      console.log(JSON.stringify(error))
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (errorMessage) return <p>{errorMessage}</p> // Return Only Error Message

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
