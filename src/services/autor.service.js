import AutorRepository from '../repositories/autor.repository.js'

async function insertAutor (autor) {
  return await AutorRepository.insertAutor(autor)
}
async function getAutor (autorId) {
  return await AutorRepository.getAutor(autorId)
}
async function getAutors () {
  return await AutorRepository.getAutors()
}
async function deleteAutor (autorId) {
  return await AutorRepository.deleteAutor(autorId)
}
async function updateAutor (autor) {
  return await AutorRepository.updateAutor(autor)
}
export default {
  insertAutor,
  getAutor,
  getAutors,
  deleteAutor,
  updateAutor
}
