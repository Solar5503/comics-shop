import { renderHook, waitFor } from '@testing-library/react'
import useInput from './useInput'

describe('Test useInput hook', () => {
  test('It should handle valid input value', async () => {
    const mockValidateValueHandler = jest.fn(() => true)
    const { result } = renderHook(() => useInput(mockValidateValueHandler))
    await waitFor(() =>
      result.current.valueChangeHandler({
        target: { value: 'Test' } as HTMLInputElement,
      } as React.ChangeEvent<HTMLInputElement>)
    )
    expect(result.current.value).toBe('Test')
    expect(result.current.isValid).toBe(true)
    expect(result.current.hasError).toBe(false)
  })
  test('It should handle invalid input value', async () => {
    const mockValidateValueHandler = jest.fn(() => false)
    const { result } = renderHook(() => useInput(mockValidateValueHandler))
    await waitFor(() =>
      result.current.valueChangeHandler({
        target: { value: 'Hi' } as HTMLInputElement,
      } as React.ChangeEvent<HTMLInputElement>)
    )
    await waitFor(() => {
      result.current.inputBlurHandler()
    })
    expect(result.current.value).toBe('Hi')
    expect(result.current.isValid).toBe(false)
    expect(result.current.hasError).toBe(true)
  })
  test('It should reset the input value and error state', async () => {
    const mockValidateValueHandler = jest.fn(() => false)
    const { result } = renderHook(() => useInput(mockValidateValueHandler))
    await waitFor(() =>
      result.current.valueChangeHandler({
        target: { value: 'reset' } as HTMLInputElement,
      } as React.ChangeEvent<HTMLInputElement>)
    )
    await waitFor(() => {
      result.current.inputBlurHandler()
    })
    expect(result.current.value).toBe('reset')
    expect(result.current.hasError).toBe(true)

    await waitFor(() => {
      result.current.reset()
    })
    expect(result.current.value).toBe('')
    expect(result.current.hasError).toBe(false)
  })
})
