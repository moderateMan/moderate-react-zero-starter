import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { registerMicroApps, start } from 'qiankun'
import apps from './apps'
import './index.css'

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
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
