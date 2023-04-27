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
]

module.exports = routes
