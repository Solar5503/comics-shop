import '@testing-library/jest-dom'
import { act, fireEvent, render, renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import { IComicFilter } from '../../../types/types'
import ComicFilter from './ComicFilter'

describe('Test ComicFilter', () => {
  const filterMock: IComicFilter = {
    limitComics: 70,
    sort: 'title',
    query: '',
    orderByDate: '-focDate',
  }
  const user = userEvent.setup()
  const mockSetOffsetComics = jest.fn()

  test('Select component for limiting comics count updates the filter state correctly', async () => {
    const { result } = renderHook(() => {
      const [filter, setFilter] = useState(filterMock)
      return { filter, setFilter }
    })
    const renderWithHook = await act(() =>
      render(
        <ComicFilter
          filter={result.current.filter}
          setFilter={result.current.setFilter}
          setOffset={mockSetOffsetComics}
        />
      )
    )
    const select = renderWithHook.container.getElementsByTagName('select')[0]
    await user.selectOptions(select, 'all')
    expect(result.current.filter).toEqual({ ...filterMock, limitComics: 100 })
    await user.selectOptions(select, '50')
    expect(result.current.filter).toEqual({ ...filterMock, limitComics: 50 })
  })

  test('Select component for sorting updates the filter state correctly', async () => {
    const { result } = renderHook(() => {
      const [filter, setFilter] = useState(filterMock)
      return { filter, setFilter }
    })
    const renderWithHook = await act(() =>
      render(
        <ComicFilter
          filter={result.current.filter}
          setFilter={result.current.setFilter}
          setOffset={mockSetOffsetComics}
        />
      )
    )
    const select = renderWithHook.container.getElementsByTagName('select')[1]
    await user.selectOptions(select, 'Title')
    expect(result.current.filter).toEqual({ ...filterMock, sort: 'title' })
    await user.selectOptions(select, 'Price')
    expect(result.current.filter).toEqual({ ...filterMock, sort: 'price' })
  })
  test('Select component for ordering by date updates the filter state correctly', async () => {
    const { result } = renderHook(() => {
      const [filter, setFilter] = useState(filterMock)
      return { filter, setFilter }
    })
    const renderWithHook = await act(() =>
      render(
        <ComicFilter
          filter={result.current.filter}
          setFilter={result.current.setFilter}
          setOffset={mockSetOffsetComics}
        />
      )
    )
    const select = renderWithHook.container.getElementsByTagName('select')[2]
    await user.selectOptions(select, 'Release Date ⬆')
    expect(result.current.filter).toEqual({
      ...filterMock,
      orderByDate: 'onsaleDate',
    })
    expect(mockSetOffsetComics).toHaveBeenCalledTimes(1)
    expect(mockSetOffsetComics).toHaveBeenCalledWith(0)
    await user.selectOptions(select, 'Modified Date ⬇')
    expect(result.current.filter).toEqual({
      ...filterMock,
      orderByDate: '-modified',
    })
    expect(mockSetOffsetComics).toHaveBeenCalledWith(0)
  })
  test('Input component for search comics updates the filter state correctly', () => {
    const prevState = filterMock
    let nextState
    const setFilterMock = jest.fn((callback) => {
      nextState = callback(prevState)
    })
    const { getByPlaceholderText } = render(
      <ComicFilter
        filter={filterMock}
        setFilter={setFilterMock}
        setOffset={mockSetOffsetComics}
      />
    )
    const input = getByPlaceholderText(/Quick Search Comics.../i)
    expect(input).toHaveValue('')
    fireEvent.change(input, { target: { value: 'hulk' } })
    expect(setFilterMock).toHaveBeenCalledTimes(1)
    expect(nextState).toEqual({ ...prevState, query: 'hulk' })
  })
})
