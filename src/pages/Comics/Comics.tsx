import { useEffect, useState } from 'react'
import ComicsList from '../../components/UI/Comics/ComicList/ComicsList'
import Error from '../../components/UI/Error/Error'
import Loader from '../../components/UI/Loader/Loader'
import { useFetching } from '../../hooks/useFetching'
import ComicsService, { TOrderBy } from '../../services/ComicsService'
import { IComic } from '../../types/types'

const Comics = () => {
  const [comics, setComics] = useState<IComic[]>([])
  const [fetchComics, isComicsLoading, ComicsError] = useFetching<
    number,
    number,
    TOrderBy
  >(async (limit, offset, orderBy) => {
    const response = await ComicsService.getAllComics(limit, offset, orderBy)
    const comicsFromServer: IComic[] = response.map((comic) => ({
      id: comic.id,
      title: comic.title,
      price: comic.prices[0].price,
      description: comic.description ?? comic.textObjects[0]?.text,
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      onsaleDate: comic.dates[0].date,
      pageCount: comic.pageCount,
      format: comic.format,
    }))
    setComics((prev) => [...prev, ...comicsFromServer])
  })

  useEffect(() => {
    fetchComics()
  }, [fetchComics])

  return (
    <section>
      {ComicsError && <Error error={ComicsError} />}
      {isComicsLoading && <Loader />}
      {!ComicsError && !isComicsLoading && <ComicsList comics={comics} />}
    </section>
  )
}

export default Comics
