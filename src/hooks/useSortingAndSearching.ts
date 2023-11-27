import { useMemo } from 'react'

/**
 * Sorts an array of objects based on a given key.
 * @param {T[]} array - The array to be sorted.
 * @param {string} sort - The key to sort the array by.
 * @return {T[]} The sorted array.
 */
export const useSorting = function <T extends Record<string, unknown>>(
  array: T[],
  sort: string
): T[] {
  const sortedArray = useMemo(() => {
    if (sort) {
      return [...array].sort((a, b) => {
        switch (true) {
          case typeof a[sort] === 'number' && typeof b[sort] === 'number':
            return (a[sort] as number) - (b[sort] as number)
          case typeof a[sort] === 'string' && typeof b[sort] === 'string':
            return (a[sort] as string).localeCompare(b[sort] as string)
          default:
            return 0
        }
      })
    }

    return array
  }, [array, sort])

  return sortedArray
}

/**
 * This is a custom hook for sorting and searching an array of objects.
 * @param {T[]} array - The array to be sorted and filtered.
 * @param {string} sort - The key to sort the array by.
 * @param {string} query - The search query.
 * @param {keyof T} filterProperty - The property to filter the array by.
 * @returns {T[]} The sorted and filtered array.
 */
export const useSortingAndSearching = function <
  T extends Record<string, unknown>
>(array: T[], sort: string, query: string, filterProperty: keyof T): T[] {
  const sortedArray = useSorting(array, sort)

  const sortedAndFilteredArray = useMemo(() => {
    return sortedArray.filter((item) => {
      if (!query) return true
      if (item[filterProperty] && typeof item[filterProperty] === 'string')
        return (item[filterProperty] as string)
          .toLowerCase()
          .includes(query.toLowerCase())
    })
  }, [sortedArray, query, filterProperty])

  return sortedAndFilteredArray
}
