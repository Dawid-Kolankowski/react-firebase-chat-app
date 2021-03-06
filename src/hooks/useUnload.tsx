import { useRef, useEffect } from 'react'

const useUnload = (executeOnUnload: any) => {
  const elementRef = useRef(executeOnUnload)
  const beforeUnload = 'beforeunload'

  useEffect(() => {
    elementRef.current = executeOnUnload
  }, [executeOnUnload])

  useEffect(() => {
    const onUnload = (...args: any) => {
      elementRef.current?.(...args)
    }
    window.addEventListener(beforeUnload, onUnload)
    return () => window.removeEventListener(beforeUnload, onUnload)
  }, [])
}

export default useUnload
