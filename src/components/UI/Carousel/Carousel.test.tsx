import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { act } from '@testing-library/react'
import renderWithRouter from '../../../test/helpers/renderWithRouter'
import Carousel from './Carousel'
import { images } from './images'

describe('Test Carousel', () => {
  const user = userEvent.setup()
  test('Carousel renders correctly', () => {
    const { getByTestId } = renderWithRouter(null)
    const carousel = getByTestId('carousel')
    const firstSlide = getByTestId('carousel-slide-0')
    const prevBtn = getByTestId('carousel-btn-prev')
    const nextBtn = getByTestId('carousel-btn-next')

    expect(carousel).toHaveClass('carousel')
    expect(firstSlide).toBeInTheDocument()
    expect(firstSlide).toHaveClass('carousel__slide')
    expect(prevBtn).toHaveClass('carousel__btn-prev')
    expect(nextBtn).toHaveClass('carousel__btn-next')
  })
  test('Active slide updates correctly when clicking the previous button', async () => {
    const { getByTestId } = renderWithRouter(
      <Carousel imagesCarousel={images} isInfinitySlides={false} />,
      '/asdf'
    )
    const prevBtn = getByTestId('carousel-btn-prev')
    const lastSlide = getByTestId('carousel-slide-2')
    await user.click(prevBtn)
    expect(lastSlide).toHaveStyle('transform: translateX(0%)')
  })
  test('Active slide updates correctly when clicking the next button', async () => {
    const { getByTestId } = renderWithRouter(
      <Carousel imagesCarousel={images} isInfinitySlides={false} />,
      '/asdf'
    )
    const nextBtn = getByTestId('carousel-btn-next')
    const secondSlide = getByTestId('carousel-slide-1')
    await user.click(nextBtn)
    expect(secondSlide).toHaveStyle('transform: translateX(0%)')
  })
  test('interval is set when isInfinitySlides is true', () => {
    jest.useFakeTimers()
    const { getByTestId } = renderWithRouter(null)
    const firstSlide = getByTestId('carousel-slide-0')
    const middleSlide = getByTestId('carousel-slide-1')
    const lastSlide = getByTestId('carousel-slide-2')
    expect(firstSlide).toHaveStyle('transform: translateX(0%)')
    expect(middleSlide).toHaveStyle('transform: translateX(100%)')
    expect(lastSlide).toHaveStyle('transform: translateX(200%)')
    act(() => jest.advanceTimersByTime(5000))
    expect(firstSlide).not.toHaveStyle('transform: translateX(0%)')
    expect(middleSlide).not.toHaveStyle('transform: translateX(100%)')
    expect(lastSlide).not.toHaveStyle('transform: translateX(200%)')
    jest.useRealTimers()
  })
  test('interval is not set when isInfinitySlides is false', () => {
    jest.useFakeTimers()
    const { getByTestId } = renderWithRouter(
      <Carousel imagesCarousel={images} isInfinitySlides={false} />,
      '/asdf'
    )
    const firstSlide = getByTestId('carousel-slide-0')
    const middleSlide = getByTestId('carousel-slide-1')
    const lastSlide = getByTestId('carousel-slide-2')
    expect(firstSlide).toHaveStyle('transform: translateX(0%)')
    expect(middleSlide).toHaveStyle('transform: translateX(100%)')
    expect(lastSlide).toHaveStyle('transform: translateX(200%)')
    act(() => jest.advanceTimersByTime(5000))
    expect(firstSlide).toHaveStyle('transform: translateX(0%)')
    expect(middleSlide).toHaveStyle('transform: translateX(100%)')
    expect(lastSlide).toHaveStyle('transform: translateX(200%)')
    jest.useRealTimers()
  })
})
