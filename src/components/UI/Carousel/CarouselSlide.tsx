import { NavLink } from 'react-router-dom'
import { IImagesCarousel } from '../../../types/types'
import styles from './CarouselSlide.module.scss'

interface ICarouselSlideProps {
  image: IImagesCarousel
  idx: number
  activeSlide: number
  timeoutSec: number
}
const CarouselSlide = ({
  image,
  idx,
  activeSlide,
  timeoutSec,
}: ICarouselSlideProps) => {
  const progressBarStyle = {
    animationDuration: `${timeoutSec}s`,
  }
  const progressBarDirectionStyle = [
    'carousel__progress-bar-bottom',
    'carousel__progress-bar-top',
    'carousel__progress-bar-left',
    'carousel__progress-bar-right',
  ]

  const transformX = (idx - activeSlide) * 100

  return (
    <div
      className={styles.carousel__slide}
      style={{ transform: `translateX(${transformX}%)` }}
    >
      <NavLink className={styles['carousel__link']} to={image.path}>
        <h1 className={styles['carousel__heading']}>{image.title}</h1>
        <picture>
          <source type="image/webp" srcSet={image.srcSetWebp} />
          <source type="image/jpeg" srcSet={image.srcSetJpg} />
          <img
            className={styles['carousel__img']}
            src={image.src}
            alt={image.alt}
            width="1920"
            height="1080"
            loading="lazy"
          />
        </picture>
      </NavLink>
      {progressBarDirectionStyle.map((direction) => (
        <div
          key={direction}
          className={styles[direction]}
          style={progressBarStyle}
        />
      ))}
    </div>
  )
}

export default CarouselSlide
