import axios from 'axios'

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response)
    return error.response?.data.message

  if (error instanceof Error) return error.message
  return String(error)
}
