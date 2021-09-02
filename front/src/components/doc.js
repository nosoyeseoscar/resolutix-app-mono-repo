// Componente que pinta oficios indiviales
import { Link } from 'react-router-dom'

const Doc = ({ doc }) => {
  const { id, numOf, promovente, tipo } = doc
  return (
    <tr>
      <td>
        <Link to={`/doctos/${id}`}>
          {numOf}
        </Link>
      </td>
      <td>{promovente}</td>
      <td>{tipo}</td>
    </tr>
  )
}

export default Doc
