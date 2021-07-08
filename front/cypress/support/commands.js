Cypress.Commands.add('login', ({ userName, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    userName,
    password
  }).then(response => {
    localStorage.setItem('loggedDoctoAppUser', JSON.stringify(response.body))
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createDoc', ({ numOf, promovente, tipo }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/documents',
    body: { numOf, promovente, tipo },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedDoctoAppUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})
