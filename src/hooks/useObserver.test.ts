import { renderHook } from '@testing-library/react'
import { useObserver } from './useObserver'

describe('Test useObserver hook', () => {
  const observer = {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }
  const intersectionObserverMock = jest.fn()
  intersectionObserverMock.mockImplementation((callback) => {
    callback([{ isIntersecting: true }], observer)
    return observer
  })
  window.IntersectionObserver = intersectionObserverMock
  const mockCallback = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('It disconnects observer when component unmounts', () => {
    const { unmount } = renderHook(() => useObserver(mockCallback))
    unmount()
    expect(observer.disconnect).toHaveBeenCalledTimes(1)
  })
  test('It should call the callback function with different options', () => {
    renderHook(() =>
      useObserver(mockCallback, undefined, undefined, '100px', 1)
    )
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(intersectionObserverMock).toHaveBeenCalledWith(
      expect.any(Function),
      { root: null, rootMargin: '100px', threshold: 1 }
    )
  })
  test('It should call the callback function when the element is intersecting', () => {
    renderHook(() => useObserver(mockCallback))
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(intersectionObserverMock).toHaveBeenCalledWith(
      expect.any(Function),
      { root: null, rootMargin: '0px', threshold: 0 }
    )
  })
  test('It should not call the callback function when the element is not intersecting', () => {
    intersectionObserverMock.mockImplementation((callback) => {
      callback([{ isIntersecting: false }], observer)
      return observer
    })
    window.IntersectionObserver = intersectionObserverMock
    renderHook(() => useObserver(mockCallback))
    expect(mockCallback).toHaveBeenCalledTimes(0)
    expect(observer.observe).toHaveBeenCalledTimes(0)
  })
  test('It should not trigger callback when isLoading is true', () => {
    renderHook(() => useObserver(mockCallback, true))
    expect(mockCallback).toHaveBeenCalledTimes(0)
    expect(observer.observe).toHaveBeenCalledTimes(0)
  })
  test('It should not trigger callback when canLoad is false', () => {
    renderHook(() => useObserver(mockCallback, false, false))
    expect(mockCallback).toHaveBeenCalledTimes(0)
    expect(observer.observe).toHaveBeenCalledTimes(0)
  })
})
