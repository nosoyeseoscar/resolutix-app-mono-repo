describe('Doc App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      userName: 'testing',
      name: 'Testing User',
      password: 'elpassword'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })
  it('frontpage can be opened', () => {
    cy.contains('Oficio')
  })

  it('login form can be opened', () => {
    cy.contains('Show Login').click()
  })

  it('user can login', () => {
    cy.contains('Show Login').click()
    cy.get('[placeholder="Username"]').type('testing')
    cy.get('[placeholder="Password"]').type('elpassword')
    cy.get('#form-login-button').click()
    cy.contains('New Document')
  })

  it('login fails with wrong password', () => {
    cy.contains('Show Login').click()
    cy.get('[placeholder="Username"]').type('testing')
    cy.get('[placeholder="Password"]').type('elpassword111')
    cy.get('#form-login-button').click()

    cy.get('.error').should('contain', 'Wrong credentials')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ userName: 'testing', password: 'elpassword' })
    })

    it('a new note can be created', () => {
      const doctoTest = {
        num_of: '00.00.01',
        promovente: 'Promovente Prueba',
        tipo: 'resolutivo'
      }
      cy.contains('New Document').click()
      cy.get('[data-test-id="form-new-document"] input').eq(0).type(doctoTest.num_of)
      cy.get('[data-test-id="form-new-document"] input').eq(1).type(doctoTest.promovente)
      cy.get('[data-test-id="form-new-document"] input').eq(2).type(doctoTest.tipo)
      cy.contains('Save').click()
    })
  })
})
