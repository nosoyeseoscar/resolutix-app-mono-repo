import { useState, useEffect } from 'react'
import doctoService from '../services/doctos'

export const useDoctos = () => {
  const [doctos, setDoctos] = useState([])

  useEffect(() => {
    doctoService.getAll().then(initialDoctos => { setDoctos(initialDoctos) })
  }, [])

  const addDocto = (doctoObject) => {
    doctoService
      .create(doctoObject)
      .then(returnedDocto => {
        setDoctos(doctos.concat(returnedDocto))
      })
  }

  return {
    doctos,
    addDocto
  }
}
