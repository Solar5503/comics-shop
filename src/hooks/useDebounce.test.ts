import { renderHook } from '@testing-library/react'
import useDebounce from './useDebounce'

describe('Test useDebounce hook', () => {
  const mockCallback = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  test('It should call the callback function after 500ms (default)', () => {
    const { result } = renderHook(() => useDebounce(mockCallback))
    result.current('test')
    expect(mockCallback).not.toHaveBeenCalled()
    jest.advanceTimersByTime(500)
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith('test')
  })
  test('It should call the callback function after 1000ms when the delay is set', () => {
    const { result } = renderHook(() => useDebounce(mockCallback, 1000))
    result.current('test')
    expect(mockCallback).not.toHaveBeenCalled()
    jest.advanceTimersByTime(1000)
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith('test')
  })
})
