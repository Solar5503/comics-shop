import { useState } from 'react'
import { IComic } from '../../../types/types'
import styles from './ComicCard.module.scss'

interface ComicCardProps {
  comic: IComic
}

const ComicCard = ({ comic }: ComicCardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const {
    // id,
    title,
    description,
    price,
    thumbnail,
    onsaleDate,
    pageCount,
    format,
  } = comic

  const dateNow = new Date()
  const onsaleDateFormatted =
    dateNow > new Date(onsaleDate)
      ? new Date(onsaleDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Not on sale yet'

  const priceFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  const descriptionFormatted = description?.replace(/<\/?[^>]+>/gi, '')

  const favoriteClickHandler = () => setIsFavorite(!isFavorite)

  return (
    <article className={styles['comic-card']}>
      <div className={styles['comic-card__header']}>
        <p>{format}</p>
      </div>
      <img
        src={thumbnail}
        alt={title}
        width="250px"
        height="384px"
        loading="lazy"
        className={styles['comic-card__img']}
      />
      <div className={styles['comic-card__title']}>
        <h3>{title}</h3>
      </div>
      <div className={styles['comic-card__info']}>
        <button
          className={styles['comic-card__button']}
          aria-label="Add to favorite"
          type="button"
          onClick={favoriteClickHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="50"
            width="50"
            fill="#fff"
            viewBox="0 0 25 25"
          >
            <path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z" />
            <path
              fillOpacity={isFavorite ? 1 : 0}
              d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
            />
          </svg>
        </button>
        <p className={styles['comic-card__price']}>
          {price === 0 ? 'Free' : priceFormatted.format(price)}
        </p>
        {pageCount !== 0 && (
          <small className={styles['comic-card__page']}>Page {pageCount}</small>
        )}
        <button
          className={styles['comic-card__button']}
          aria-label="Add to cart"
          type="button"
        >
          <svg
            width="70"
            height="70"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 4.5H5.05848C5.7542 4.5 6.10206 4.5 6.36395 4.68876C6.62584 4.87752 6.73584 5.20753 6.95585 5.86754L7.5 7.5"
              stroke="#fff"
              strokeLinecap="round"
            />
            <path
              d="M17.5 17.5H8.05091C7.90471 17.5 7.83162 17.5 7.77616 17.4938C7.18857 17.428 6.78605 16.8695 6.90945 16.2913C6.92109 16.2367 6.94421 16.1674 6.99044 16.0287V16.0287C7.04177 15.8747 7.06743 15.7977 7.09579 15.7298C7.38607 15.0342 8.04277 14.5608 8.79448 14.5054C8.8679 14.5 8.94906 14.5 9.11137 14.5H14.5"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.1787 14.5H11.1376C9.85836 14.5 9.21875 14.5 8.71781 14.1697C8.21687 13.8394 7.96492 13.2515 7.461 12.0757L7.29218 11.6818C6.48269 9.79294 6.07794 8.84853 6.52255 8.17426C6.96715 7.5 7.99464 7.5 10.0496 7.5H15.3305C17.6295 7.5 18.779 7.5 19.2126 8.24711C19.6462 8.99422 19.0758 9.99229 17.9352 11.9884L17.6517 12.4846C17.0897 13.4679 16.8088 13.9596 16.3432 14.2298C15.8776 14.5 15.3113 14.5 14.1787 14.5Z"
              stroke="#fff"
              strokeLinecap="round"
            />
            <circle cx="17" cy="20" r="1" fill="#fff" />
            <circle cx="9" cy="20" r="1" fill="#fff" />
          </svg>
        </button>
      </div>
      <div className={styles['comic-card__description']}>
        <h4 className={styles['comic-card__header']}>Description</h4>
        <p>{descriptionFormatted ? descriptionFormatted : 'No description'}</p>
        {onsaleDateFormatted !== 'Not on sale yet' && <p>On sale since</p>}
        <p className={styles['comic-card__date']}>{onsaleDateFormatted}</p>
      </div>
    </article>
  )
}

export default ComicCard
