debugger
const { APP_SUB_VUE, NODE_ENV, APP_SUB_REACT } = process.env
const microApps = [
  {
    name: 'sub-vue',
    entry: NODE_ENV !== 'development' ? '/subapp/sub-vue/' : APP_SUB_VUE,
    activeRule: '/subVue',
    container: '#sub-View-vue'
  },
  {
    name: 'sub-react',
    entry: NODE_ENV !== 'development' ? '/subapp/sub-react/' : APP_SUB_REACT,
    activeRule: '/subReact',
    container: '#sub-View-react'
  }
]

const apps = microApps.map(item => {
  return {
    ...item
  }
})

export default apps
