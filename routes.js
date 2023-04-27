const routes = [
  {
    method: '*',
    path: '/',
    handler: (req, h) => {
      return '404'
    },
  },
  {
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      return 'homepage'
    },
  },
  {
    method: 'GET',
    path: '/book/{name}',
    handler: (req, h) => {
      const { name } = req.params
      return `new arrival book ${name}`
    },
  },
  // optional path parameter
  {
    method: 'GET',
    path: '/upcoming-book/{name?}',
    handler: (req, h) => {
      const {name} = req.params
      return `upcoming book ${name}`
    }
  }
]

module.exports = routes
