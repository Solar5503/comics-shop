import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ComicsList from '../../../components/Comics/ComicList/ComicsList'
import Card from '../../../components/UI/Card/Card'
import Error from '../../../components/UI/Error/Error'
import Loader from '../../../components/UI/Loader/Loader'
import { useFetching } from '../../../hooks/useFetching'
import ComicsService from '../../../services/ComicsService'
import { TComic } from '../../../types/types'
import styles from './ComicsBySeries.module.scss'

type TComicsBySeriesParams = {
  seriesId: string
}
const ComicsBySeries = () => {
  const { seriesId = '' } = useParams<TComicsBySeriesParams>()
  const [comicsBySeries, setComicsBySeries] = useState<TComic[]>([])
  const [fetchComicsBySeries, isComicsBySeriesLoading, comicsBySeriesError] =
    useFetching<string>(async (seriesId) => {
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
          series: {
            seriesId: RegExp(/\d+$/).exec(comic.series.resourceURI)![0],
            name: comic.series.name,
          },
        })
      )

      setComicsBySeries(comicsBySeriesFromServer)
    })

  useEffect(() => {
    fetchComicsBySeries(seriesId)
  }, [fetchComicsBySeries, seriesId])

  return (
    <section>
      {comicsBySeriesError && <Error error={comicsBySeriesError} />}
      {!comicsBySeriesError && (
        <>
          <Card className={styles.card}>
            <h1 className={styles.card__title}>
              {comicsBySeries[0]?.series?.name}
            </h1>
            <p>{comicsBySeries[0]?.description}</p>
          </Card>
          <ComicsList
            comics={comicsBySeries}
            isComicsLoading={isComicsBySeriesLoading}
            title=""
          />
        </>
      )}
      {isComicsBySeriesLoading && <Loader />}
    </section>
  )
}

export default ComicsBySeries
