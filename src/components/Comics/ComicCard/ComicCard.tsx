import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TComic } from '../../../types/types'
import {
  descriptionFormatted,
  formatColorStyle,
  priceFormatted,
} from '../../../utils/valueFormatted'
import CartButton from '../../UI/CartButton/CartButton'
import FavoriteButton from '../../UI/FavoriteButton/FavoriteButton'
import styles from './ComicCard.module.scss'

interface ComicCardProps {
  comic: TComic
}

const ComicCard = ({ comic }: ComicCardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [isComicAddingToCart, setIsComicAddingToCart] = useState<boolean>(false)
  const { id, title, description, price, thumbnail, pageCount, format } = comic

  const stylesArr = [
    'comic-card__header--comic',
    'comic-card__header--digital-vertical-comic',
    'comic-card__header--trade-paperback',
    'comic-card__header--hardcover',
    'comic-card__header--digital-comic',
    'comic-card__header--digest',
    'comic-card__header--catalog',
  ]

  const favoriteClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  const addToCartClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsComicAddingToCart(!isComicAddingToCart)
  }

  return (
    <article className={styles['comic-card']} data-testid="comic-card">
      <Link
        to={`/comics/${id}`}
        className={styles['comic-card__link']}
        aria-label="Go to this comic"
        data-testid="link-to-single-comic-page"
      />
      <div
        className={`${styles['comic-card__header']} ${formatColorStyle(
          styles,
          stylesArr,
          format
        )}`}
        data-testid="format"
      >
        <p className={styles['comic-card__format']}>{format}</p>
      </div>
      <img
        src={thumbnail}
        alt={title}
        width="250px"
        height="384px"
        loading="lazy"
        className={styles['comic-card__img']}
      />
      <div className={styles['comic-card__title']} data-testid="title">
        <h3>{title}</h3>
      </div>
      <div className={styles['comic-card__info']}>
        <FavoriteButton
          isFavorite={isFavorite}
          favoriteClickHandler={favoriteClickHandler}
          className={styles['comic-card__button']}
        />
        <p className={styles['comic-card__price']}>{priceFormatted(price)}</p>
        {pageCount !== 0 && (
          <small className={styles['comic-card__page']}>
            Pages {pageCount}
          </small>
        )}
        <CartButton
          className={styles['comic-card__button']}
          isAddingToCart={isComicAddingToCart}
          addToCartClickHandler={addToCartClickHandler}
        />
      </div>
      <div
        className={styles['comic-card__description']}
        data-testid="description"
      >
        <h4 className={styles['comic-card__header']}>Preview</h4>
        <p>{descriptionFormatted(description)}</p>
      </div>
    </article>
  )
}

export default ComicCard
