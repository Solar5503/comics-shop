import '@testing-library/jest-dom'
import { act, fireEvent, render, renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import { ICharacterFilter } from '../../../types/types'
import CharacterFilter from './CharacterFilter'

describe('Test CharacterFilter', () => {
  const filterMock: ICharacterFilter = {
    limitCharacters: 20,
    orderBy: 'name',
    query: '',
  }
  const user = userEvent.setup()
  const mockSetOffsetCharacters = jest.fn()

  test('Select component for limiting characters count updates the filter state correctly', async () => {
    const { result } = renderHook(() => {
      const [filter, setFilter] = useState(filterMock)
      return { filter, setFilter }
    })
    const renderWithHook = await act(() =>
      render(
        <CharacterFilter
          filter={result.current.filter}
          setFilter={result.current.setFilter}
          setOffset={mockSetOffsetCharacters}
        />
      )
    )
    const select = renderWithHook.container.getElementsByTagName('select')[0]
    await user.selectOptions(select, 'all')
    expect(result.current.filter).toEqual({
      ...filterMock,
      limitCharacters: 100,
    })
    await user.selectOptions(select, '50')
    expect(result.current.filter).toEqual({
      ...filterMock,
      limitCharacters: 50,
    })
  })

  test('Select component for ordering by name and date updates the filter state correctly', async () => {
    const { result } = renderHook(() => {
      const [filter, setFilter] = useState(filterMock)
      return { filter, setFilter }
    })
    const renderWithHook = await act(() =>
      render(
        <CharacterFilter
          filter={result.current.filter}
          setFilter={result.current.setFilter}
          setOffset={mockSetOffsetCharacters}
        />
      )
    )
    const select = renderWithHook.container.getElementsByTagName('select')[1]
    await user.selectOptions(select, 'Name ⬇')
    expect(result.current.filter).toEqual({ ...filterMock, orderBy: '-name' })
    expect(mockSetOffsetCharacters).toHaveBeenCalledTimes(1)
    expect(mockSetOffsetCharacters).toHaveBeenCalledWith(0)
    await user.selectOptions(select, 'Modified Date ⬇')
    expect(result.current.filter).toEqual({
      ...filterMock,
      orderBy: '-modified',
    })
    expect(mockSetOffsetCharacters).toHaveBeenCalledWith(0)
  })

  test('Input component for search characters updates the filter state correctly', () => {
    const prevState = filterMock
    let nextState
    const setFilterMock = jest.fn((callback) => {
      nextState = callback(prevState)
    })
    const { getByPlaceholderText } = render(
      <CharacterFilter
        filter={filterMock}
        setFilter={setFilterMock}
        setOffset={mockSetOffsetCharacters}
      />
    )
    const input = getByPlaceholderText(/Smart Search Characters.../i)
    expect(input).toHaveValue('')
    fireEvent.change(input, { target: { value: 'spider-man' } })
    expect(setFilterMock).toHaveBeenCalledTimes(1)
    expect(nextState).toEqual({ ...prevState, query: 'spider-man' })
  })
})
