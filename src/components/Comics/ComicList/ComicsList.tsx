import { TComic } from '../../../types/types'
import Card from '../../UI/Card/Card'
import ComicCard from '../ComicCard/ComicCard'
import styles from './ComicsList.module.scss'

interface IComicsListProps {
  comics: TComic[]
  isComicsLoading: boolean
}

const ComicsList = ({ comics, isComicsLoading }: IComicsListProps) => {
  if (comics.length === 0 && !isComicsLoading)
    return (
      <Card>
        <p className={styles.comicsList__empty} data-testid="comics-list-empty">
          No comics found !
        </p>
      </Card>
    )

  return (
    <div className={styles.comicsList}>
      <h1 className={styles.comicsList__title} data-testid="comics-list-title">
        Comics List
      </h1>
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} data-testid="comic-card" />
      ))}
    </div>
  )
}

export default ComicsList
