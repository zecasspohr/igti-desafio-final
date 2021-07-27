import Autor from '../models/autor.model.js'

async function insertAutor (autor) {
  return await Autor.create(autor)
}

async function getAutors () {
  return await Autor.findAll()
}

async function getAutor (id) {
  return await Autor.findByPk(id)
}

async function deleteAutor (id) {
  await Autor.destroy({
    where: {
      autorId: id
    }
  })
}
async function updateAutor (autor) {
  await Autor.update(autor, {
    where: {
      autorId: autor.autorId
    }
  })
  return await getAutor(autor.autorId)
}

export default {
  insertAutor,
  getAutors,
  getAutor,
  updateAutor,
  deleteAutor
}
