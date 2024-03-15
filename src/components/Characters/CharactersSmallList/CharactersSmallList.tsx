import { ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { TComic } from '../../../types/types'
import { formatColorStyle } from '../../../utils/valueFormatted'
import styles from './CharactersSmallList.module.scss'

interface ICharactersSmallListProps extends ComponentProps<'div'> {
  comic: TComic | Record<string, never>
}

const CharactersSmallList = ({
  comic,
  className,
}: ICharactersSmallListProps) => {
  const { characters, format } = comic
  const classes = `${styles['characters-small-list']} ${className}`

  const stylesArr = [
    'characters-small-list__header--comic',
    'characters-small-list__header--digital-vertical-comic',
    'characters-small-list__header--trade-paperback',
    'characters-small-list__header--hardcover',
    'characters-small-list__header--digital-comic',
    'characters-small-list__header--digest',
    'characters-small-list__header--catalog',
  ]

  if (characters?.length === 0) return null

  return (
    characters && (
      <div className={classes}>
        <h3
          className={`${
            styles['characters-small-list__header']
          } ${formatColorStyle(styles, stylesArr, format)}`}
          data-testid="characters-small-list-header"
        >
          Characters
        </h3>
        <ul
          className={styles['characters-small-list__listing']}
          style={{
            backgroundColor: format
              ? `var(--${format?.replace(/ /g, '-').toLowerCase()}-color)`
              : 'var(--primary-color)',
          }}
          data-testid="characters-small-list-listing"
        >
          {characters?.map((character) => (
            <li
              key={character.characterId}
              data-testid="characters-small-list-item"
            >
              <Link
                to={`/characters/${character.characterId}`}
                className={styles['characters-small-list__link']}
                data-testid="characters-small-list-link"
              >
                {character.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  )
}

export default CharactersSmallList
