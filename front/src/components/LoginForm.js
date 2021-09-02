import { PropTypes } from 'prop-types'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

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
    <Form onSubmit={handleSubmit}>
      <Form.Group id='username'>
        <Form.Control
          {...username}
          name='Username'
          placeholder='Username'
          onChange={props.handleUsernameChange}
        />
      </Form.Group>
      <Form.Group id='password'>
        <Form.Control
          {...password}
          name='Password'
          placeholder='Password'
          onChange={props.handlePasswordChange}
        />
      </Form.Group>
      <Button type='submit' id='form-login-button'>Login</Button>
    </Form>
  )
}

/* <form onSubmit={handleSubmit}>
      <div id='username'>
        <input
          {...username}
          name='Username'
          placeholder='Username'
        />
      </div>
      <div id='password'>
        <input
          {...password}
          name='Password'
          placeholder='Password'
        />
      </div>
      <button type='submit' id='form-login-button'>Login</button>
    </form> */

LoginForm.propTypes = {
  handleLogin: PropTypes.func
}
