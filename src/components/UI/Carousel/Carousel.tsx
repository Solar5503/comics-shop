import { useCallback, useEffect, useState } from 'react'
import { IImagesCarousel } from '../../../types/types'
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
    >
      {imagesCarousel.map((image, index) => (
        <CarouselSlide
          key={index}
          image={image}
          idx={index}
          activeSlide={activeSlide}
          timeoutSec={timeoutSlideSec}
        />
      ))}
      <button
        className={`${styles.carousel__btn} ${styles['carousel__btn-prev']}`}
        onClick={prevClickHandler}
      >
        <i className={styles['carousel__btn-arrow-prev']} />
      </button>
      <button
        className={`${styles.carousel__btn} ${styles['carousel__btn-next']}`}
        onClick={nextClickHandler}
      >
        <i className={styles['carousel__btn-arrow-next']} />
      </button>
    </div>
  )
}

export default Carousel
