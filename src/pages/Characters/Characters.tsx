import { useEffect, useState } from 'react'
import CharacterFilter from '../../components/Characters/CharacterFilter/CharacterFilter'
import CharactersList from '../../components/Characters/CharactersList/CharactersList'
import Error from '../../components/UI/Error/Error'
import Loader from '../../components/UI/Loader/Loader'
import useDebounce from '../../hooks/useDebounce'
import { useFetching } from '../../hooks/useFetching'
import { useObserver } from '../../hooks/useObserver'
import { useSortingAndSearching } from '../../hooks/useSortingAndSearching'
import ComicsService from '../../services/ComicsService'
import {
  ICharacterFilter,
  TCharacter,
  TOrderCharacterBy,
} from '../../types/types'
import { charactersFormatted } from '../../utils/valueFormatted'

const Characters = () => {
  const [characters, setCharacters] = useState<TCharacter[]>([])
  const [offsetCharacters, setOffsetCharacters] = useState(0)
  const [totalCharactersCount, setTotalCharactersCount] = useState(0)
  const [{ limitCharacters, query, orderBy }, setFilter] =
    useState<ICharacterFilter>({
      orderBy: 'name',
      query: '',
      limitCharacters: 20,
    })
  const [charactersSearchByName, setCharactersSearchByName] = useState<
    TCharacter[]
  >([])

  const sortedAndFilteredCharacters = useSortingAndSearching<TCharacter>(
    characters,
    '',
    query,
    'name'
  )

  const [fetchCharacters, isCharactersLoading, charactersError] = useFetching<
    number,
    number,
    TOrderCharacterBy
  >(async (limit, offset, orderBy) => {
    const response = await ComicsService.getAllCharacters(
      limit,
      offset,
      orderBy
    )
    const totalCharactersCountFromServer = response.total
    setTotalCharactersCount(totalCharactersCountFromServer)
    const charactersFromServer: TCharacter[] = charactersFormatted(
      response.results,
      orderBy
    )

    setCharacters((prev) => {
      //reset state for new orderBy
      if (orderBy !== prev[0]?.orderBy) return charactersFromServer

      //remove duplicates from backend
      return [...prev, ...charactersFromServer].filter(
        (el1, i, ar) => i === ar.findIndex(({ id }) => id === el1.id)
      )
    })
  })

  const targetRefCharacters = useObserver(
    () => setOffsetCharacters((prev) => prev + limitCharacters),
    isCharactersLoading,
    offsetCharacters < totalCharactersCount && query.length === 0,
    '150%'
  )

  useEffect(() => {
    if (query.length === 0)
      fetchCharacters(limitCharacters, offsetCharacters, orderBy)
  }, [fetchCharacters, limitCharacters, offsetCharacters, orderBy, query])

  const [fetchByNameCharacter, isByNameCharacterLoading, byNameCharacterError] =
    useFetching<string>(async (query) => {
      const response = await ComicsService.getCharactersByName(query)
      const charactersByNameFromServer: TCharacter[] = charactersFormatted(
        response,
        orderBy
      )
      setCharactersSearchByName(charactersByNameFromServer)
    })

  const debouncedFetchByNameCharacter = useDebounce<string>(
    fetchByNameCharacter,
    1000
  )

  useEffect(() => {
    if (query.length > 0 && sortedAndFilteredCharacters.length === 0)
      debouncedFetchByNameCharacter(query)
  }, [debouncedFetchByNameCharacter, query, sortedAndFilteredCharacters])

  return (
    <section data-testid="characters-page">
      {charactersError && <Error error={charactersError} />}
      {byNameCharacterError && <Error error={byNameCharacterError} />}
      <CharacterFilter
        filter={{ limitCharacters, query, orderBy }}
        setFilter={setFilter}
        setOffset={setOffsetCharacters}
      />
      {!charactersError && (
        <CharactersList
          characters={
            query.length > 0 && sortedAndFilteredCharacters.length === 0
              ? charactersSearchByName
              : sortedAndFilteredCharacters
          }
          isCharactersLoading={
            query.length > 0 && sortedAndFilteredCharacters.length === 0
              ? isByNameCharacterLoading
              : isCharactersLoading
          }
        />
      )}
      {isCharactersLoading && <Loader />}
      {isByNameCharacterLoading && <Loader />}
      <div ref={targetRefCharacters} />
    </section>
  )
}

export default Characters
