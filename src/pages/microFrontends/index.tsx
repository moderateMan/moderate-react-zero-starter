import { useEffect } from 'react'

export default () => {
  useEffect(() => {
    //启动微前端 1
    window.g_microAppsStart()
  }, [])
  return <div key="sub-View" id="sub-View"></div>
}
