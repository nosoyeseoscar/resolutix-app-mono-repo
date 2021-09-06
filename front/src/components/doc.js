// Componente que pinta oficios indiviales
import { TableRow, TableCell } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Doc = ({ doc }) => {
  const { id, numOf, promovente, tipo } = doc
  return (
    <TableRow>
      <TableCell>
        <Link to={`/doctos/${id}`}>
          {numOf}
        </Link>
      </TableCell>
      <TableCell>{promovente}</TableCell>
      <TableCell>{tipo}</TableCell>
    </TableRow>
  )
}

export default Doc
