import { PropTypes } from 'prop-types'
import { useState } from 'react'
import { Button } from './Button'

const useField = ({ type }) => {
  const [value, setValue] = useState()

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export default function LoginForm ({ handleSubmit, ...props }) {
  const username = useField({ type: 'text' })
  const password = useField({ type: 'password' })

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          {...username}
          name='Username'
          placeholder='Username'
        />
      </div>
      <div>
        <input
          {...password}
          name='Password'
          placeholder='Password'
        />
      </div>
      <Button id='form-login-button'>Login</Button>
    </form>

  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func
}
