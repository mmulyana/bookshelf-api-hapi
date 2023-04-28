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
  },
  {
    method: 'GET',
    path: '/search',
    handler: (req, h) => {
      const { name, author } = req.query
      return `book name : ${name}, author ${author}`
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: (req, h) => {
      const { username, password} = req.payload
      return `welcome ${username}`
    }
  }
]

module.exports = routes
