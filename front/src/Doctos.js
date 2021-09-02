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
  console.log(doctos)
  const doctos1 = doctos
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

      {
        doctos.length
          ? <DocumentList docs={doctos1} />
          : <h2>Loading Documents List</h2>
      }
    </div>
  )
}

export default Doctos
// <DocumentList docs={doctos} />
