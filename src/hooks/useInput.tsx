import { useState } from 'react'

const useInput = (initialValue: string) => {
  const [value, setValue] = useState<any>(initialValue)

  return {
    value,
    setValue,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    },
  }
}

export default useInput
