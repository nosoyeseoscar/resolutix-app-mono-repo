// Componente que pinta la lista de oficios.
import Doc from './doc'
import Table from 'react-bootstrap/Table'

const DocumentList = ({ docs }) => {
  return (
    <div>
      <h2>Oficios</h2>
      <Table striped>
        <tbody>
          <tr>
            <th>No. Oficio</th>
            <th>Promovente</th>
            <th>Tipo</th>
          </tr>
          {docs.map((doc) => (
            <Doc key={doc.id} doc={doc} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default DocumentList
