import { renderHook } from '@testing-library/react'
import { useSorting, useSortingAndSearching } from './useSortingAndSearching'

describe('Test useSorting hook', () => {
  const array = [
    { title: 'Hulk', price: 1099 },
    { title: 'Spiderman', price: 300 },
    { title: 'Capitan America', price: 756 },
  ]
  test('It should sort the array with string values correctly', () => {
    const sortedArray = [
      { title: 'Capitan America', price: 756 },
      { title: 'Hulk', price: 1099 },
      { title: 'Spiderman', price: 300 },
    ]
    const { result } = renderHook(() => useSorting(array, 'title'))
    expect(result.current).toEqual(sortedArray)
  })
  test('It should sort the array with number values correctly', () => {
    const sortedArray = [
      { title: 'Spiderman', price: 300 },
      { title: 'Capitan America', price: 756 },
      { title: 'Hulk', price: 1099 },
    ]
    const { result } = renderHook(() => useSorting(array, 'price'))
    expect(result.current).toEqual(sortedArray)
  })
  test('It should return the original array if type of sort is not string or number', () => {
    const array = [
      { title: 'Hulk', date: new Date('2022-07-01') },
      { title: 'Spiderman', date: new Date('2022-03-01') },
      { title: 'Capitan America', date: new Date('2022-05-01') },
    ]
    const { result } = renderHook(() => useSorting(array, 'date'))
    expect(result.current).toEqual(array)
  })
  test('It should return the original array if sort key is empty string', () => {
    const { result } = renderHook(() => useSorting(array, ''))
    expect(result.current).toEqual(array)
  })
})

describe('Test useSortingAndSearching hook', () => {
  const array = [
    { title: 'Hulk', price: 700 },
    { title: 'Spiderman', price: 200 },
    { title: 'Capitan America', price: 1300 },
  ]
  test('It should return the sorted array if query is empty', () => {
    const sortedArray = [
      { title: 'Spiderman', price: 200 },
      { title: 'Hulk', price: 700 },
      { title: 'Capitan America', price: 1300 },
    ]
    const { result } = renderHook(() =>
      useSortingAndSearching(array, 'price', '', 'title')
    )
    expect(result.current).toEqual(sortedArray)
  })
  test('It should return the sorted and filtered array if query is not empty', () => {
    const query = 'pi'
    const filteredArray = [
      { title: 'Spiderman', price: 200 },
      { title: 'Capitan America', price: 1300 },
    ]
    const { result } = renderHook(() =>
      useSortingAndSearching(array, 'price', query, 'title')
    )
    expect(result.current).toEqual(filteredArray)
  })
  test('It should return an empty array when no items match the query', () => {
    const query = 'thor'
    const { result } = renderHook(() =>
      useSortingAndSearching(array, 'price', query, 'title')
    )
    expect(result.current).toEqual([])
  })
})
