import { useState, useRef } from 'react'
import Togglable from './Toggable';

export default function DoctoForm({ addDocto, logoutUser }) {
    const [newNoOficio, setNewNoOficio] = useState('')
    const [newPromovente, setNewPromovente] = useState('')
    const [newTipo, setNewTipo] = useState('')

    //hook UseRef
    const toggleRef = useRef()

    const handleChangeNoOficio = (event) => {
        setNewNoOficio(event.target.value)
    }

    const handleChangePromovente = (event) => {
        setNewPromovente(event.target.value)
    }

    const handleChangeTipo = (event) => {
        setNewTipo(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const doctoObject = {
            numOf: newNoOficio,
            promovente: newPromovente,
            tipo: newTipo,
            userId: ""
        }

        addDocto(doctoObject)
        //limpiamos formulario
        setNewNoOficio('')
        setNewPromovente('')
        setNewTipo('')
        toggleRef.current.toggleVisibility()

    }

    return (
        <Togglable buttonLabel='New Document' ref={toggleRef}>
            <div>
                <h3>Create a new Document</h3>
                <form data-test-id="form-new-document" onSubmit={handleSubmit}>
                    <input
                        value={newNoOficio}
                        onChange={handleChangeNoOficio}
                    />
                    <input
                        value={newPromovente}
                        onChange={handleChangePromovente}
                    />
                    <input
                        value={newTipo}
                        onChange={handleChangeTipo}
                    />
                    <button type='submit'>Save</button>
                </form>
                <button onClick={logoutUser}>LogOut</button>
            </div>
        </Togglable>
    )

}