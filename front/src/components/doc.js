// Componente que pinta oficios indiviales
import { Link } from 'react-router-dom'

const Doc = ({ doc }) => {
  const { id, numOf, promovente, tipo } = doc
  return (
    <tr>
      <Link to={`/doctos/${id}`}>
        <td>{numOf}</td>
      </Link>
      <td>{promovente}</td>
      <td>{tipo}</td>

    </tr>
  )
}

export default Doc
