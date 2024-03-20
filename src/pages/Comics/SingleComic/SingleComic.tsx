import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CharactersSmallList from '../../../components/Characters/CharactersSmallList/CharactersSmallList'
import CreatorsList from '../../../components/Creators/CreatorsList/CreatorsList'
import Card from '../../../components/UI/Card/Card'
import CartButton from '../../../components/UI/CartButton/CartButton'
import Error from '../../../components/UI/Error/Error'
import FavoriteButton from '../../../components/UI/FavoriteButton/FavoriteButton'
import Loader from '../../../components/UI/Loader/Loader'
import NextButton from '../../../components/UI/NextButton/NextButton'
import PrevButton from '../../../components/UI/PrevButton/PrevButton'
import { useFetching } from '../../../hooks/useFetching'
import ComicsService from '../../../services/ComicsService'
import { TComic } from '../../../types/types'
import { navigateToNextAndPrevById } from '../../../utils/navigateToNextAndPrevById'
import {
  descriptionFormatted,
  formatColorStyle,
  onsaleDateFormatted,
  priceFormatted,
} from '../../../utils/valueFormatted'
import styles from './SingleComic.module.scss'

type TComicParams = {
  comicId: string
}
const SingleComic = () => {
  const [comic, setComic] = useState<TComic | Record<string, never>>({})
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [isComicAddingToCart, setIsComicAddingToCart] = useState<boolean>(false)
  const [comicsBySeries, setComicsBySeries] = useState<TComic[]>()
  const navigate = useNavigate()
  const { comicId = '' } = useParams<TComicParams>()
  const [fetchComicById, isComicLoading, comicError] = useFetching<string>(
    async (comicId) => {
      const comicResponse = await ComicsService.getComicById(comicId!)
      const comicFromServer: TComic = {
        id: comicResponse[0].id,
        title: comicResponse[0].title,
        price: comicResponse[0].prices[0].price,
        description:
          comicResponse[0].description || comicResponse[0].textObjects[0]?.text,
        thumbnail: !comicResponse[0].thumbnail.path.includes(
          'image_not_available'
        )
          ? `${comicResponse[0].thumbnail.path}.${comicResponse[0].thumbnail.extension}`
          : `/images/no-image.jpg`,
        onsaleDate: comicResponse[0].dates[0].date,
        pageCount: comicResponse[0].pageCount,
        format: comicResponse[0].format,
        series: {
          seriesId: RegExp(/\d+$/).exec(
            comicResponse[0].series.resourceURI
          )![0],
          name: comicResponse[0].series.name,
        },
        creators: comicResponse[0].creators.items.map((creator) => ({
          creatorId: RegExp(/\d+$/).exec(creator.resourceURI)![0],
          name: creator.name,
          role: creator.role,
        })),
        characters: comicResponse[0].characters.items.map((character) => ({
          characterId: RegExp(/\d+$/).exec(character.resourceURI)![0],
          name: character.name,
        })),
      }

      const seriesId = comicFromServer.series?.seriesId
      const comicsBySeriesResponse = await ComicsService.getAllComicsBySeriesId(
        seriesId!
      )
      const comicsBySeriesFromServer: TComic[] = comicsBySeriesResponse.map(
        (comic) => ({
          id: comic.id,
          title: comic.title,
          format: comic.format,
          price: comic.prices[0].price,
          description: comic.description || comic.textObjects[0]?.text,
          thumbnail: !comic.thumbnail.path.includes('image_not_available')
            ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
            : `/images/no-image.jpg`,
          onsaleDate: comic.dates[0].date,
          pageCount: comic.pageCount,
        })
      )

      setComicsBySeries(comicsBySeriesFromServer)
      setComic(comicFromServer)
    }
  )

  useEffect(() => {
    fetchComicById(comicId)
  }, [comicId, fetchComicById])

  const {
    id: currentId,
    title,
    description,
    price,
    thumbnail,
    onsaleDate,
    pageCount,
    format,
    series,
  } = comic

  const prevClickHandler = () => {
    const prevId = navigateToNextAndPrevById(currentId, comicsBySeries ?? [])[0]
      .id
    navigate(`/comics/${prevId}`)
  }
  const nextClickHandler = () => {
    const nextId = navigateToNextAndPrevById(currentId, comicsBySeries ?? [])[1]
      .id
    navigate(`/comics/${nextId}`)
  }

  const stylesArr = [
    'single-comic__title--comic',
    'single-comic__title--digital-vertical-comic',
    'single-comic__title--trade-paperback',
    'single-comic__title--hardcover',
    'single-comic__title--digital-comic',
    'single-comic__title--digest',
    'single-comic__title--catalog',
  ]
  const stylesForArrowObj = {
    borderColor: format
      ? `var(--${format?.replace(/ /g, '-').toLowerCase()}-color)`
      : 'white',
  }

  return (
    <section data-testid="single-comic-page">
      {comicError && <Error error={comicError} />}
      {isComicLoading && <Loader />}
      {!comicError && (
        <Card className={styles['single-comic']}>
          <h1
            className={`${styles['single-comic__title']} ${formatColorStyle(
              styles,
              stylesArr,
              format
            )}`}
          >
            {comic.title}
          </h1>
          <div className={styles['single-comic__wrapper-img']}>
            <img
              src={thumbnail}
              alt={title}
              width="550px"
              height="845px"
              loading="lazy"
              className={styles['single-comic__img']}
            />
          </div>
          <div>
            <h2 className={styles['single-comic__subtitle']}>Series:</h2>
            <Link
              to={`/series/${series?.seriesId}/comics`}
              className={styles['single-comic__series-link']}
            >
              {series?.name}
            </Link>
          </div>
          <div className={styles['single-comic__controls']}>
            <FavoriteButton
              isFavorite={isFavorite}
              favoriteClickHandler={() => setIsFavorite(!isFavorite)}
            />
            <p className={styles['single-comic__price']}>
              {priceFormatted(price)}
            </p>
            <CartButton
              isAddingToCart={isComicAddingToCart}
              addToCartClickHandler={() =>
                setIsComicAddingToCart(!isComicAddingToCart)
              }
            />
          </div>
          {description && (
            <div
              className={styles['single-comic__description']}
              style={{
                backgroundColor: format
                  ? `var(--${format?.replace(/ /g, '-').toLowerCase()}-color)`
                  : 'var(--primary-color)',
              }}
            >
              <p>{descriptionFormatted(description)}</p>
            </div>
          )}
          <div className={styles['single-comic__info']}>
            {onsaleDateFormatted(onsaleDate) !== 'Not on sale yet' && (
              <p>On sale since</p>
            )}
            <p>{onsaleDateFormatted(onsaleDate)}</p>
            {pageCount !== 0 && <small>Pages {pageCount}</small>}
          </div>
          <CreatorsList
            comic={comic}
            className={styles['single-comic__creators']}
          />
          <CharactersSmallList
            comic={comic}
            className={styles['single-comic__characters']}
          />
          <div className={styles['single-comic__wrapper-btn']}>
            <PrevButton
              onClick={prevClickHandler}
              className={styles['single-comic__btn']}
              data-btn={
                navigateToNextAndPrevById(currentId, comicsBySeries ?? [])[0]
                  ?.title
              }
              stylesForArrow={stylesForArrowObj}
              aria-label="Previous comic"
            />
            <NextButton
              onClick={nextClickHandler}
              className={styles['single-comic__btn']}
              data-btn={
                navigateToNextAndPrevById(currentId, comicsBySeries ?? [])[1]
                  ?.title
              }
              stylesForArrow={stylesForArrowObj}
              aria-label="Next comic"
            />
          </div>
        </Card>
      )}
    </section>
  )
}

export default SingleComic
