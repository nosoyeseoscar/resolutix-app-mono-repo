import React, { useState } from 'react'

const Home = () => <h1>Home Page</h1>

const Notes = () => <h1>Notes</h1>

const Users = () => <h1>Users</h1>

const inLineStyles = {
  padding: 5
}

const App = () => {
  const [page, setPages] = useState(() => {
    const { pathname } = window.location
    const page = pathname.slice(1)
    return page
  })

  const getContent = () => {
    if (page === 'users') { return <Users /> } else if (page === 'notes') {
      return <Notes />
    } else { return <Home /> }
  }

  const toPage = page => event => {
    event.preventDefault()

    window.history.pushState(null, '', `/${page}`)
    setPages(page)
  }

  return (
    <div>
      <header>
        <a href='#' onClick={toPage('home')} style={inLineStyles}>Home</a>
        <a href='#' onClick={toPage('notes')} style={inLineStyles}>Notes</a>
        <a href='#' onClick={toPage('users')} style={inLineStyles}>Users</a>
      </header>
      {getContent()}
    </div>
  )
}

export default App
