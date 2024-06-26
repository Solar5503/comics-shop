import { IComicFilter, TOrderBy, TSortComicBy } from '../../../types/types'
import Card from '../../UI/Card/Card'
import Input from '../../UI/Input/Input'
import Select from '../../UI/Select/Select'
import styles from './ComicFilter.module.scss'

interface IComicFilterProps {
  filter: IComicFilter
  setFilter: React.Dispatch<React.SetStateAction<IComicFilter>>
  setOffset: React.Dispatch<React.SetStateAction<number>>
}

const ComicFilter = ({ filter, setFilter, setOffset }: IComicFilterProps) => {
  return (
    <Card className={styles['comic-filter']}>
      <Select
        value={filter.limitComics}
        changeHandler={(value) =>
          setFilter((prev) => ({ ...prev, limitComics: +value }))
        }
        defaultValue="Comics Count"
        options={[
          { name: '20', value: 20 },
          { name: '50', value: 50 },
          { name: '70', value: 70 },
          { name: 'all', value: 100 },
        ]}
      />
      <Select
        urlArrow="/select/hulk-arrow.svg"
        value={filter.sort}
        changeHandler={(value) =>
          setFilter((prev) => ({ ...prev, sort: value as TSortComicBy }))
        }
        defaultValue="Sort by"
        options={[
          { name: 'Title', value: 'title' },
          { name: 'Format', value: 'format' },
          { name: 'Price', value: 'price' },
          { name: 'Default', value: '' },
        ]}
      />
      <Select
        urlArrow="/select/captain-arrow.svg"
        value={filter.orderByDate}
        changeHandler={(value) => {
          setOffset(0)
          setFilter((prev) => ({ ...prev, orderByDate: value as TOrderBy }))
        }}
        defaultValue="Order by"
        options={[
          { name: 'Order Cut-off Date ⬇', value: '-focDate' },
          { name: 'Order Cut-off Date ⬆', value: 'focDate' },
          { name: 'Release Date ⬇', value: '-onsaleDate' },
          { name: 'Release Date ⬆', value: 'onsaleDate' },
          { name: 'Modified Date ⬇', value: '-modified' },
          { name: 'Modified Date ⬆', value: 'modified' },
          { name: 'Default', value: '' },
        ]}
      />
      <Input
        type="search"
        name="search comics"
        placeholder="Quick Search Comics..."
        className={styles['comic-filter__input']}
        value={filter.query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFilter((prev) => ({ ...prev, query: e.target.value }))
        }
      />
    </Card>
  )
}

export default ComicFilter
