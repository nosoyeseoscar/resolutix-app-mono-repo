import { useState } from 'react'
import Togglable from './Toggable'
import { PropTypes } from 'prop-types'

export default function LoginForm ({ handleLogin }) {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(userName, password)
    setUsername('')
    setPassword('')
  }

  return (
    <Togglable buttonLabel='Show Login'>
      <h2>Login User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={userName}
            name='Username'
            placeholder='Username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={handlePasswordChange}
          />
        </div>
        <button id='form-login-button'>Login</button>
      </form>
    </Togglable>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func
}
