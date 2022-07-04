import { useEffect } from 'react'
export default (generate, deps) => {
  useEffect(() => {
    generate()
  }, deps)
}
