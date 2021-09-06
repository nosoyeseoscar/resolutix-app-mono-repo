// Componente que pinta la lista de oficios.
import { TableBody, Table, TableContainer, TableRow, TableCell } from '@material-ui/core'
import Doc from './doc'

const DocumentList = ({ docs }) => {
  return (
    <div>
      <h2>Oficios</h2>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                No. Oficio
              </TableCell>
              <TableCell>
                Promovente
              </TableCell>
              <TableCell>
                Tipo
              </TableCell>
            </TableRow>
            {docs.map((doc) => (
              <Doc key={doc.id} doc={doc} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DocumentList
