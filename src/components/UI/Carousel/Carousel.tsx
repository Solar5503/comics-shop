import { useCallback, useEffect, useId, useState } from 'react'
import { IImagesCarousel } from '../../../types/types'
import NextButton from '../NextButton/NextButton'
import PrevButton from '../PrevButton/PrevButton'
import styles from './Carousel.module.scss'
import CarouselSlide from './CarouselSlide'

interface ICarouselProps {
  imagesCarousel: IImagesCarousel[]
  timeoutSlideSec?: number
  isInfinitySlides?: boolean
  firstSlide?: number
  animationIteration?: number | string
}

const Carousel = ({
  imagesCarousel,
  timeoutSlideSec = 5,
  isInfinitySlides = true,
  firstSlide = 1,
  animationIteration = `infinite`,
}: ICarouselProps) => {
  const [activeSlide, setActiveSlide] = useState<number>(firstSlide - 1)
  const id = useId()

  const prevClickHandler = useCallback(() => {
    setActiveSlide((prev) =>
      prev === 0 ? imagesCarousel.length - 1 : prev - 1
    )
  }, [imagesCarousel.length])

  const nextClickHandler = useCallback(() => {
    setActiveSlide((prev) =>
      prev === imagesCarousel.length - 1 ? 0 : prev + 1
    )
  }, [imagesCarousel.length])

  useEffect(() => {
    const interval = isInfinitySlides
      ? setInterval(nextClickHandler, timeoutSlideSec * 1000)
      : undefined

    return () => clearInterval(interval)
  }, [nextClickHandler, timeoutSlideSec, isInfinitySlides])

  return (
    <div
      className={styles.carousel}
      style={{
        animationDuration: `${timeoutSlideSec * imagesCarousel.length}s`,
        animationIterationCount: animationIteration,
      }}
      data-testid="carousel"
    >
      {imagesCarousel.map((image, index) => (
        <CarouselSlide
          key={id + index}
          image={image}
          idx={index}
          activeSlide={activeSlide}
          timeoutSec={timeoutSlideSec}
          data-testid={`carousel-slide-` + index}
        />
      ))}
      <PrevButton
        className={`${styles.carousel__btn} ${styles['carousel__btn-prev']}`}
        onClick={prevClickHandler}
        data-testid="carousel-btn-prev"
        aria-label="Previous slide"
      />
      <NextButton
        className={`${styles.carousel__btn} ${styles['carousel__btn-next']}`}
        onClick={nextClickHandler}
        data-testid="carousel-btn-next"
        aria-label="Next slide"
      />
    </div>
  )
}

export default Carousel
