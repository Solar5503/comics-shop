import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from '../../../components/UI/Card/Card'
import Error from '../../../components/UI/Error/Error'
import FavoriteButton from '../../../components/UI/FavoriteButton/FavoriteButton'
import Loader from '../../../components/UI/Loader/Loader'
import { useFetching } from '../../../hooks/useFetching'
import ComicsService from '../../../services/ComicsService'
import { TCharacter } from '../../../types/types'
import styles from './SingleCharacter.module.scss'

type TCharacterParams = {
  characterId: string
}
const SingleCharacter = () => {
  const [character, setCharacter] = useState<
    TCharacter | Record<string, never>
  >({})
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const { characterId } = useParams<TCharacterParams>()
  const [fetchCharacterById, isCharacterLoading, characterError] =
    useFetching<string>(async (characterId) => {
      const characterResponse = await ComicsService.getCharacterById(
        characterId!
      )
      const characterFromServer: TCharacter = {
        id: characterResponse[0].id,
        name: characterResponse[0].name,
        description: characterResponse[0].description,
        thumbnail: !characterResponse[0].thumbnail.path.includes(
          'image_not_available'
        )
          ? `${characterResponse[0].thumbnail.path}.${characterResponse[0].thumbnail.extension}`
          : `/images/no-character.webp`,
        comics: [],
        series: characterResponse[0].series.items.map((series) => ({
          seriesId: RegExp(/\d+$/).exec(series.resourceURI)?.[0] ?? '',
          name: series.name,
        })),
      }

      const comicsByCharacterResponse =
        await ComicsService.getComicsByCharacterId(characterId!)
      const comics = comicsByCharacterResponse.map((comic) => ({
        comicId: comic.id,
        name: comic.title,
        comicImg: !comic.thumbnail.path.includes('image_not_available')
          ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
          : `/images/no-comic.webp`,
      }))
      characterFromServer.comics = comics

      setCharacter(characterFromServer)
    })

  useEffect(() => {
    fetchCharacterById(characterId)
  }, [characterId, fetchCharacterById])

  return (
    <section data-testid="single-character-page">
      {characterError && <Error error={characterError} />}
      {!characterError && !isCharacterLoading && (
        <Card className={styles['single-character']}>
          <div className={styles['single-character__info']}>
            <h1 className={styles['single-character__title']}>
              {character.name}
            </h1>
          </div>
          <div className={styles['single-character__wrapper-img']}>
            <img
              src={character.thumbnail}
              alt={character.name}
              width="700px"
              loading="lazy"
              className={styles['single-character__img']}
            />
            <FavoriteButton
              favoriteClickHandler={() => setIsFavorite(!isFavorite)}
              isFavorite={isFavorite}
              className={styles['single-character__favorite-button']}
            />
          </div>
          {character.description && (
            <p className={styles['single-character__description']}>
              {character.description}
            </p>
          )}
          {character?.comics?.length > 0 && (
            <div className={styles['single-character__comics']}>
              <h2
                className={`${styles['single-character__subtitle']} ${styles['single-character__subtitle--animation-comics']}`}
              >
                Comics
              </h2>
              <ul className={styles['single-character__comics-list']}>
                {character?.comics?.map((comic) => (
                  <li
                    className={styles['single-character__comics-item']}
                    key={comic.comicId}
                  >
                    <Link
                      to={`/comics/${comic.comicId}`}
                      className={`${styles['single-character__comics-link']} ${styles.link}`}
                    >
                      <div
                        className={
                          styles['single-character__wrapper-comics-img']
                        }
                      >
                        <img
                          src={comic.comicImg}
                          alt={comic.name}
                          width="125px"
                          height="192px"
                          loading="lazy"
                          className={styles['single-character__comics-img']}
                        />
                      </div>
                      <p className={styles['single-character__comics-name']}>
                        {comic.name}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {character?.series?.length > 0 && (
            <div className={styles['single-character__series']}>
              <h2
                className={`${styles['single-character__subtitle']} ${styles['single-character__subtitle--skew']} ${styles['single-character__subtitle--animation-series']}`}
              >
                Series
              </h2>
              <ul className={styles['single-character__series-list']}>
                {character?.series?.map((series) => (
                  <li
                    className={styles['single-character__series-item']}
                    key={series.seriesId}
                  >
                    <Link
                      to={`/series/${series.seriesId}/comics`}
                      className={`${styles['single-character__series-link']} ${styles.link}`}
                    >
                      {series.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}
      {isCharacterLoading && <Loader />}
    </section>
  )
}

export default SingleCharacter
