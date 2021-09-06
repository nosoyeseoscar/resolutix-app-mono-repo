import { PropTypes } from 'prop-types'
import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
        <TextField
          {...username}
          name='Username'
          placeholder='Username'
          onChange={props.handleUsernameChange}
          label='User Name'
          variant='outlined'
        />
      </div>
      <div>
        <TextField
          {...password}
          name='Password'
          placeholder='Password'
          onChange={props.handlePasswordChange}
          label='Password'
          variant='outlined'
        />
      </div>
      <Button color='primary' variant='contained' id='form-login-button'>Login</Button>
    </form>

  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func
}
