import { useRef, useEffect } from 'react'

const useUnload = (fn: any) => {
  const cb = useRef(fn)

  useEffect(() => {
    cb.current = fn
  }, [fn])

  useEffect(() => {
    const onUnload = (...args: any) => cb.current?.(...args)

    window.addEventListener('beforeunload', onUnload)

    return () => window.removeEventListener('beforeunload', onUnload)
  }, [])
}

export default useUnload
