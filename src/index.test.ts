import { matchRegex } from './'

type Dataset = [string, string, boolean][]

const testDataset = (dataset: Dataset) => {
  expect.assertions(dataset.length)

  for (const data of dataset) {
    expect(matchRegex(data[0], data[1])).toBe(data[2])
  }
}

test('matches without special character', () => {
  testDataset([['a', 'a', true], ['a', 'b', false], ['ab', 'ab', true], ['ab', 'abc', true]])
})

test('matches with stars', () => {
  testDataset([
    ['a*b', 'b', true],
    ['a*b', 'ab', true],
    ['a*b', 'aaaaab', true],
    ['a*b', 'a', false],
  ])
})

test('matches with pipes', () => {
  testDataset([['ab|ba', 'ab', true], ['ab|ba', 'ba', true], ['ab|ba', 'ac', false]])
})
