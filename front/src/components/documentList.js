// Componente que pinta la lista de oficios.
import Doc from './doc'

const DocumentList = ({ docs }) => {
  return (
    <div>
      <h2>Oficios</h2>
      <table>
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
      </table>
    </div>
  )
}

export default DocumentList
