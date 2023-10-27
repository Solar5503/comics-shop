import { useEffect, useState } from 'react'
import ComicFilter from '../../components/Comics/ComicFilter/ComicFilter'
import ComicsList from '../../components/Comics/ComicList/ComicsList'
import Error from '../../components/UI/Error/Error'
import Loader from '../../components/UI/Loader/Loader'
import { useFetching } from '../../hooks/useFetching'
import { useSortingAndSearching } from '../../hooks/useSortingAndSearching'
import ComicsService from '../../services/ComicsService'
import { IComic, IFilter, TOrderBy } from '../../types/types'

const Comics = () => {
  const [comics, setComics] = useState<IComic[]>([])
  const [filter, setFilter] = useState<IFilter>({
    sort: '',
    query: '',
    limitComics: 20,
    orderByDate: '-focDate',
  })
  const sortedAndFilteredComics = useSortingAndSearching<IComic>(
    comics,
    filter.sort,
    filter.query
  )

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
      thumbnail: !comic.thumbnail.path.includes('image_not_available')
        ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
        : `/images/no-image.jpg`,
      onsaleDate: comic.dates[0].date,
      pageCount: comic.pageCount,
      format: comic.format,
    }))
    setComics(comicsFromServer)
  })

  useEffect(() => {
    fetchComics(filter.limitComics, 0, filter.orderByDate)
  }, [fetchComics, filter.limitComics, filter.orderByDate])

  return (
    <section>
      {ComicsError && <Error error={ComicsError} />}
      <ComicFilter filter={filter} setFilter={setFilter} />
      {isComicsLoading && <Loader />}
      {!ComicsError && !isComicsLoading && (
        <ComicsList comics={sortedAndFilteredComics} />
      )}
    </section>
  )
}

export default Comics
