import { useEffect, useState } from 'react'
import doctoService from '../services/doctos'

export const useUser = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedDoctoAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      doctoService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    setUser(null)
    doctoService.setToken(null)
    window.localStorage.removeItem('loggedDoctoAppUser')
  }

  return {
    user, logout
  }
}
