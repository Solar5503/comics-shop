import { MutableRefObject, useEffect, useRef } from 'react'
interface IUseObserverFunc {
  (
    callback: () => void,
    isLoading?: boolean,
    canLoad?: boolean,
    rootMargin?: IntersectionObserverInit['rootMargin'],
    threshold?: IntersectionObserverInit['threshold']
  ): MutableRefObject<null>
}

/**
 * This is a custom hook for observing elements.
 * @param {function} callback - The callback function that will be triggered when the element is observed.
 * @param {boolean | undefined} isLoading - A boolean value that indicates if the data is still loading.
 * @param {boolean | undefined} canLoad - A boolean value that determines whether the callback should be triggered or not.
 * @param {string | undefined} rootMargin - The rootMargin property allows us to define margins around the root element to expand or shrink it (px or percentage).
 * - Specifying a positive value will expand the root element and trigger the callback even when the observed element is still away from entering the viewport
 * - Specifying a negative value will shrink the root element
 * @param {number | number[] | undefined} threshold - The threshold property allows us to specify a percentage of the element’s size  that must be visible for it that we want to trigger the callback. It accepts a number value between 0 and 1, and can also accept an array of numbers to create multiple trigger points.
 * - A default value of 0 means the element is considered intersecting as soon as a single pixel becomes visible
 * - Setting a value of 1 means the entire element must be visible
 * @returns {MutableRefObject<null>}  A reference to the target element
 */
export const useObserver: IUseObserverFunc = (
  callback,
  isLoading = false,
  canLoad = true,
  rootMargin = '0px',
  threshold = 0
) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const targetRef = useRef(null)

  useEffect(() => {
    if (isLoading) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && canLoad) callback()
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    )
    if (targetRef.current) observerRef.current.observe(targetRef.current)

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [callback, canLoad, isLoading, rootMargin, threshold])

  return targetRef
}
