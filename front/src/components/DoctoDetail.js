import React from 'react'
import { useParams } from 'react-router-dom'

export const DoctoDetail = ({ doctos }) => {
  const { doctoId } = useParams()

  const docto = doctos.find(docto => docto.id === doctoId)
  if (!docto) return null
  const { numOf, promovente, tipo } = docto
  return (
    <tr>
      <td>{numOf}</td>
      <td>{promovente}</td>
      <td>{tipo}</td>
    </tr>
  )
}
