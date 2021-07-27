import Livro from '../models/livro.model.js'

async function insertLivro (livro) {
  return await Livro.create(livro)
}

async function getLivros () {
  return await Livro.findAll()
}
async function getLivrosByAutor (autorId) {
  return await Livro.findAll({
    where: {
      autorId: autorId
    }
  })
}

async function getLivro (id) {
  return await Livro.findByPk(id, { raw: true })
}

async function deleteLivro (id) {
  await Livro.destroy({
    where: {
      livroId: id
    }
  })
}
async function updateLivro (livro) {
  await Livro.update(livro, {
    where: {
      livroId: livro.livroId
    }
  })
  return await getLivro(livro.livroId)
}

export default {
  insertLivro,
  getLivros,
  getLivrosByAutor,
  getLivro,
  updateLivro,
  deleteLivro
}
