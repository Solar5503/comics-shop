import { useState } from 'react'

/**
 *This is a custom hook for handling input validation
 * @param {function} validateValueHandler - The function that validates the value and returns a boolean.
 * @returns {object} An object containing the following properties:
 * - value: The current value of the input field.
 * - isValid: A boolean indicating whether the input field is valid or not.
 * - hasError: A boolean indicating whether the input field has an error or not.
 * - valueChangeHandler: A function that is called when the value of the input field changes.
 * - inputBlurHandler: A function that is called when the input field loses focus.
 * - reset: A function that resets the input field and its error state.
 */
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
