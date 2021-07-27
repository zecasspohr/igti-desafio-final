import LivroRepository from '../repositories/livro.repository.js'
import LivroInfoService from './livroInfo.service.js'
import VendaService from './venda.service.js'

async function insertLivro (livro) {
  return await LivroRepository.insertLivro(livro)
}
async function getLivro (livroId, getInfo = true) {
  const livro = await LivroRepository.getLivro(livroId)
  if (!livro) return {}
  if (getInfo) {
    livro.livroInfo = await LivroInfoService.getLivroInfo(livroId)
  }
  return livro
}
async function getLivros (autorId) {
  if (autorId) {
    return await LivroRepository.getLivrosByAutor(autorId)
  }
  return await LivroRepository.getLivros()
}
async function deleteLivro (livroId) {
  if (await VendaService.getVendas(livroId)) {
    throw new Error('Não é permitido excluir livro com venda!')
  }
  return await LivroRepository.deleteLivro(livroId)
}
async function updateLivro (livro) {
  return await LivroRepository.updateLivro(livro)
}
export default {
  insertLivro,
  getLivro,
  getLivros,
  deleteLivro,
  updateLivro
}
