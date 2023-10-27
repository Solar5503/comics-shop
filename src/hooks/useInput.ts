import { useState } from 'react'

const useInput = (validateValueHandler: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState<string>('')
  const [isTouched, setIsTouched] = useState<boolean>(false)

  const valueIsValid = validateValueHandler(enteredValue)
  const hasError = !valueIsValid && isTouched
  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEnteredValue(event.target.value)
  const inputBlurHandler = () => setIsTouched(true)
  const reset = () => {
    setEnteredValue('')
    setIsTouched(false)
  }
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  }
}
export default useInput
