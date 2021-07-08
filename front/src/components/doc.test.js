import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/react'
import Doc from './doc'

test('renders content', () => {
  const docto = {
    numOf: 'numero prueba',
    promovente: 'promovente prueba',
    tipo: 'tipo prueba'
  }

  const component = render(<Doc doc={docto} />)

  component.getByText('numero prueba')
  // expect(component.container).toHaveTextContent(docto.numOf)

  // component.debug() //muestra lo que se renderiza

  /* const li = component.container.querySelector('tr')
    console.log(prettyDOM(li))

    ********* prueba de boton
    Creamos funcion espia.
    const mockHandler = jest.fn()

    const button = component.getByText('Texto Boton')

    fireEvent.click(button)

    expect(mockHandler).toHaveBeenCalledTimes(1)

    */
})
