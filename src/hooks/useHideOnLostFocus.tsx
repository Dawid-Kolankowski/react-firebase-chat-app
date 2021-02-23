import React, { useRef, useEffect } from 'react'

const useHideOnLostFocus = (switchElement: () => void) => {
  const element = useRef<any>(null)

  const handleClick = (e: any) => {
    if (element && element.current && element.current.contains(e.target)) {
      return
    }

    switchElement()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  return element
}

export default useHideOnLostFocus
