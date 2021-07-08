// Componente que busca en la lista de oficios por un topico
import { useState } from 'react'

export default function SearchDocto () {
  const [topic, setTopic] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handleInputChange = (target) => setTopic(target.value)

  return (
    <div>
      <h2>Buscar Oficio</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={topic}
          onChange={handleInputChange}
        />
        <button>Buscar</button>
      </form>
    </div>
  )
}
