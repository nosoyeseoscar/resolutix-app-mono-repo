const { palindrome } = require('../utils/for_testing')

test.skip('palindrome of Oscar', () => {
  const result = palindrome('oscar')

  expect(result).toBe('racso')
})

test.skip('palindrome of empty string', () => {
  const result = palindrome('')

  expect(result).toBe('')
})

test.skip('palindrome of undefined', () => {
  const result = palindrome()

  expect(result).toBeUndefined()
})
