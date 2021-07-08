import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Togglable from './Toggable';
import i18n from '../i18n/index'

describe('<Toggable />', () => {
    const buttonLabel = 'show'
    let component

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel={buttonLabel}>
                <div className='testDiv'>testDivContent</div>
            </Togglable>
        )
    })

    test('render its children', () => {
        component.getByText('testDivContent')
    })

    test('render diplay none', () => {
        const el = component.getByText('testDivContent')
        expect(el.parentNode).toHaveStyle('display: none')
    })

    /* test('after clicking children must be show', () => {
        const button = component.getByText(buttonLabel)
        fireEvent.click(button)

        const el = component.getByText('testDivContent')
        expect(el.parentNode).not.toHaveStyle('display: none')
    }) */

    test('toggle content can be closed', () => {
        const button = component.getByText(buttonLabel)
        fireEvent.click(button)

        const el = component.getByText('testDivContent')
        expect(el.parentNode).not.toHaveStyle('display: none')

        const cancelButton = component.getByText(i18n.TOGGABLE.CANCEL_BUTTON)
        fireEvent.click(cancelButton)

        expect(el.parentNode).toHaveStyle('display: none')
    })
})