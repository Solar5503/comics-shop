import { useEffect, useState } from 'react'
import ComicFilter from '../../components/Comics/ComicFilter/ComicFilter'
import ComicsList from '../../components/Comics/ComicList/ComicsList'
import Error from '../../components/UI/Error/Error'
import Loader from '../../components/UI/Loader/Loader'
import { useFetching } from '../../hooks/useFetching'
import { useObserver } from '../../hooks/useObserver'
import { useSortingAndSearching } from '../../hooks/useSortingAndSearching'
import ComicsService from '../../services/ComicsService'
import { IComicFilter, TComic, TOrderBy } from '../../types/types'

const Comics = () => {
  const [comics, setComics] = useState<TComic[]>([])
  const [offsetComics, setOffsetComics] = useState<number>(0)
  const [totalComicsCount, setTotalComicsCount] = useState<number>(0)
  const [{ limitComics, orderByDate, query, sort }, setFilter] =
    useState<IComicFilter>({
      sort: '',
      query: '',
      limitComics: 20,
      orderByDate: '-focDate',
    })
  const sortedAndFilteredComics = useSortingAndSearching<TComic>(
    comics,
    sort,
    query,
    'title'
  )

  const [fetchComics, isComicsLoading, comicsError] = useFetching<
    number,
    number,
    TOrderBy
  >(async (limit, offset, orderBy) => {
    const response = await ComicsService.getAllComics(limit, offset, orderBy)
    const totalComicsCountFromServer = response.total
    setTotalComicsCount(totalComicsCountFromServer)

    const comicsFromServer: TComic[] = response.results.map((comic) => ({
      id: comic.id,
      title: comic.title,
      price: comic.prices[0].price,
      description: comic.description || comic.textObjects[0]?.text,
      thumbnail: !comic.thumbnail.path.includes('image_not_available')
        ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
        : `/images/no-comic.webp`,
      onsaleDate: comic.dates[0].date,
      pageCount: comic.pageCount,
      format: comic.format,
      orderBy: orderBy ?? '-focDate',
    }))

    setComics((prev) => {
      //reset state for new orderBy
      if (orderBy !== prev[0]?.orderBy) return comicsFromServer

      //remove duplicates from backend
      return [...prev, ...comicsFromServer].filter(
        (el1, i, ar) => i === ar.findIndex((el2) => el2.id === el1.id)
      )
    })
  })

  const targetRefComics = useObserver(
    () => setOffsetComics((prev) => prev + limitComics),
    isComicsLoading,
    offsetComics < totalComicsCount && query.length === 0,
    '150%'
  )

  useEffect(() => {
    fetchComics(limitComics, offsetComics, orderByDate)
  }, [fetchComics, limitComics, orderByDate, offsetComics])

  return (
    <section data-testid="comics-page">
      {comicsError && <Error error={comicsError} />}
      <ComicFilter
        filter={{ limitComics, orderByDate, query, sort }}
        setFilter={setFilter}
        setOffset={setOffsetComics}
      />
      {!comicsError && (
        <ComicsList
          comics={sortedAndFilteredComics}
          isComicsLoading={isComicsLoading}
        />
      )}
      {isComicsLoading && <Loader />}
      <div ref={targetRefComics} />
    </section>
  )
}

export default Comics
