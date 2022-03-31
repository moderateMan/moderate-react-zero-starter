import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { registerMicroApps, start } from 'qiankun'
import apps from './apps'
import './index.css'

function render() {
  const root = createRoot(document.getElementById('root')!)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  )
}

const loader = () => render()
render()
const microApps: any = apps.map(app => ({
  ...app,
  loader
}))

window.g_microAppsStart = () => {
  registerMicroApps(microApps)
  start()
}
