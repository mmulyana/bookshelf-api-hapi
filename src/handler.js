const { nanoid } = require('nanoid')
const books = require('./books')

const addBookHandler = (req, h) => {
  const { title, tags, body } = req.payload
  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newBook = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  }

  books.push(newBook)

  const isSuccess = books.filter((book) => book.ud === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'berhasil ditambah',
      date: {
        noteId: id,
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

const getAllBooksHandler = () => ({
  status: 'success',
  data: {
    books,
  },
})

const getBookByIdHandler = (req, h) => {
  const { id } = req.params

  const book = books.filter((book) => book.id === id)[0]

  if (note !== undefined) {
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

  const { title, tags, body } = req.payload

  const updatedAt = new Date().toISOString()

  const index = books.findIndex((book) => book.id === id)

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    }
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  })
  response.code(404)
  return response
}

const deleteBookByIdHandler = (req, h) => {
  const { id } = req.params

  const index = notes.findIndex((note) => note.id === id)

  if (index !== -1) {
    notes.splice(index, 1)
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
  deleteBookByIdHandler
}
