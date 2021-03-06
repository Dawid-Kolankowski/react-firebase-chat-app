import React, { useRef, useEffect } from 'react'

const useHideOnLostFocus = (switchElement: () => void) => {
  const element = useRef<any>(null)
  const mouseDown = 'mouseDown'

  const checkInsideClick = (e: any) => {
    return element && element.current && element.current.contains(e.target)
  }

  const handleClick = (e: any) => {
    if (checkInsideClick(e)) {
      return
    }
    switchElement()
  }

  useEffect(() => {
    document.addEventListener(mouseDown, handleClick)

    return () => {
      document.removeEventListener(mouseDown, handleClick)
    }
  }, [])

  return element
}

export default useHideOnLostFocus
