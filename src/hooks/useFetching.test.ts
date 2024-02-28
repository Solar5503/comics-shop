import { act, renderHook } from '@testing-library/react'
import { useFetching } from './useFetching'

describe('Test useFetching hook', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('It should call the callback function with no arguments', async () => {
    const mockCallback = jest.fn()
    const { result } = renderHook(() => useFetching(mockCallback))
    const [fetching] = result.current
    await act(async () => {
      await fetching()
    })
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith()
  })
  test('It should call the callback function with arguments', async () => {
    const mockCallback = jest.fn()
    const { result } = renderHook(() => useFetching(mockCallback))
    const [fetching] = result.current
    await act(async () => {
      await fetching(1, 2, 3)
    })
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith(1, 2, 3)
  })
  test('It should set the error message when an error occurs during fetching', async () => {
    const mockError = new Error('Test error')
    const mockCallback = jest.fn().mockRejectedValue(mockError)
    try {
      renderHook(() => useFetching(mockCallback))
    } catch (error) {
      expect((error as Error).message).toBe(mockError)
    }
  })
})
