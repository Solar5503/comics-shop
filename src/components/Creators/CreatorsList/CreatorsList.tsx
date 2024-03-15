import { TComic } from '../../../types/types'
import { formatColorStyle, roleFormatted } from '../../../utils/valueFormatted'
import styles from './CreatorsList.module.scss'

interface ICreatorsListProps extends React.HTMLAttributes<HTMLDivElement> {
  comic: TComic | Record<string, never>
}
const CreatorsList = ({ comic, className }: ICreatorsListProps) => {
  const { format, creators } = comic
  const classes = `${styles['creators-list']} ${className}`

  const stylesArr = [
    'creators-list__header--comic',
    'creators-list__header--digital-vertical-comic',
    'creators-list__header--trade-paperback',
    'creators-list__header--hardcover',
    'creators-list__header--digital-comic',
    'creators-list__header--digest',
    'creators-list__header--catalog',
  ]

  if (creators?.length === 0) return null

  return (
    creators && (
      <div className={classes}>
        <h3
          className={`${styles['creators-list__header']} ${formatColorStyle(
            styles,
            stylesArr,
            format
          )}`}
          data-testid="creators-list-header"
        >
          Creators
        </h3>
        <ul
          className={styles['creators-list__listing']}
          style={{
            backgroundColor: format
              ? `var(--${format?.replace(/ /g, '-').toLowerCase()}-color)`
              : 'var(--primary-color)',
          }}
          data-testid="creators-list-listing"
        >
          {creators?.map((creator) => (
            <li key={creator.creatorId} data-testid="creators-list-item">
              {`${roleFormatted(creator.role)}: ${creator.name.toUpperCase()}`}
            </li>
          ))}
        </ul>
      </div>
    )
  )
}

export default CreatorsList
