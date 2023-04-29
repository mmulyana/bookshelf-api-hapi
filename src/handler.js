const { nanoid } = require('nanoid')
const books = require('./books')

const addBookHandler = (req, h) => {
  if (!req.payload.hasOwnProperty('name') || !req.payload.name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    })

    response.code(400)
    return response
  }

  if (req.payload.readPage > req.payload.pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    })

    response.code(400)
    return response
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload

  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const finished = pageCount === readPage

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  }

  books.push(newBook)

  const isSuccess = books.filter((book) => book.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      date: {
        bookId: id,
      },
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal ditambahkan',
  })

  response.code(500)
  return response
}

const getAllBooksHandler = (req, h) => {
  const response = h.response({
    status: 'success',
    data: {
      books,
    },
  })

  response.code(200)
  return response
}

const getBookByIdHandler = (req, h) => {
  const { id } = req.params

  const book = books.filter((book) => book.id === id)[0]

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'buku tidak ditemukan',
  })

  response.code(404)
  return response
}

const editBookByIdHandler = (req, h) => {
  const { id } = req.params

  if (!req.payload.hasOwnProperty('name') || !req.payload.name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    })

    response.code(400)
    return response
  }

  if (req.payload.readPage > req.payload.pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    })

    response.code(400)
    return response
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload

  const updatedAt = new Date().toISOString()

  const index = books.findIndex((book) => book.id === id)

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    }
    const response = h.response({
      status: 'success',
      message: 'buku berhasil diperbarui',
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  })
  response.code(404)
  return response
}

const deleteBookByIdHandler = (req, h) => {
  const { id } = req.params

  const index = books.findIndex((book) => book.id === id)
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    })

    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  })
  response.code(404)
  return response
}

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
}
