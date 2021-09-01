import './App.css'
// components
import DocumentList from './components/documentList'
import SearchDocto from './components/SearchDocto'
import DoctoForm from './components/formDocto'
import Notification from './components/Notification'
/* Hooks */
import { useDoctos } from './hooks/useDoctos'
import { useUser } from './hooks/useUser'

function Doctos () {
  const { doctos, addDocto } = useDoctos()
  const { user, logout } = useUser()

  // const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div className='App'>
      <h1>Oficios Delegacion BCS</h1>

      <Notification message='' />
      <SearchDocto />
      {
        user
          ? <DoctoForm addDocto={addDocto} logoutUser={logout} />
          : <h2> User not logged</h2>
      }
      <DocumentList docs={doctos} />
    </div>
  )
}

export default Doctos
