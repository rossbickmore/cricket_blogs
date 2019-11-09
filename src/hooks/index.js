import {useState} from 'react'

export const useField = (placeholder) => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    e.preventDefault()
    setValue(e.target.value)
    console.log(value)
  }
  const reset = () => {
    setValue("")
  }
  return {
    placeholder,
    value,
    onChange,
    reset
  }
}