import { useEffect } from 'react'

export default () => {
  useEffect(() => {
    window.g_microAppsStart()
  }, [])
  return <div id="sub-View-vue"></div>
}
