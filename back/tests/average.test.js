const { avergage } = require('../utils/for_testing.js')

describe.skip('average', () => {
  test('of one value is the value itself', () => {
    expect(avergage([1])).toBe(1)
  })

  test('of many is the value correctly', () => {
    expect(avergage([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(avergage([])).toBe(0)
  })

  test('of undefined is undefined', () => {
    expect(avergage()).toBeUndefined()
  })
})
