import { ICharacterFilter, TOrderCharacterBy } from '../../../types/types'
import Card from '../../UI/Card/Card'
import Input from '../../UI/Input/Input'
import Select from '../../UI/Select/Select'
import styles from './CharacterFilter.module.scss'

interface ICharacterFilterProps {
  filter: ICharacterFilter
  setFilter: React.Dispatch<React.SetStateAction<ICharacterFilter>>
  setOffset: React.Dispatch<React.SetStateAction<number>>
}

const CharacterFilter = ({
  filter,
  setFilter,
  setOffset,
}: ICharacterFilterProps) => {
  return (
    <Card className={styles['character-filter']}>
      <Select
        urlArrow="/select/animal-arrow.svg"
        value={filter.limitCharacters}
        changeHandler={(value) =>
          setFilter((prev) => ({ ...prev, limitCharacters: +value }))
        }
        defaultValue="Characters Count"
        options={[
          { name: '20', value: 20 },
          { name: '50', value: 50 },
          { name: '70', value: 70 },
          { name: 'all', value: 100 },
        ]}
      />
      <Select
        urlArrow="/select/ironman-arrow.svg"
        value={filter.orderBy}
        changeHandler={(value) => {
          setOffset(0)
          setFilter((prev) => ({
            ...prev,
            orderBy: value as TOrderCharacterBy,
          }))
        }}
        defaultValue="Order by"
        options={[
          { name: 'Name ⬇', value: '-name' },
          { name: 'Name ⬆', value: 'name' },
          { name: 'Modified Date ⬇', value: '-modified' },
          { name: 'Modified Date ⬆', value: 'modified' },
        ]}
      />
      <Input
        type="search"
        name="search characters"
        placeholder="Smart Search Characters..."
        className={styles['character-filter__input']}
        value={filter.query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFilter((prev) => ({
            ...prev,
            query: e.target.value.toLowerCase(),
          }))
        }
      />
    </Card>
  )
}

export default CharacterFilter
