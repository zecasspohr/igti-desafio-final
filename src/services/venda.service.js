import VendaRepository from '../repositories/venda.repository.js'
import livroService from './livro.service.js'

async function insertVenda (venda) {
  const livro = await livroService.getLivro(venda.livroId, false)
  if (livro.estoque <= 0) {
    throw new Error('Livro sem estoque')
  }

  livro.estoque--
  await livroService.updateLivro(livro)

  venda.valor = livro.valor
  return await VendaRepository.insertVenda(venda)
}
async function getVenda (vendaId) {
  return await VendaRepository.getVenda(vendaId)
}
async function getVendas (livroId, clienteId, autorId) {
  if (livroId) {
    return await VendaRepository.getVendasByLivro(livroId)
  }
  if (clienteId) {
    return await VendaRepository.getVendasByCliente(clienteId)
  }
  if (autorId) {
    return await VendaRepository.getVendasByAutor(autorId)
  }
  return await VendaRepository.getVendas()
}
async function deleteVenda (vendaId) {
  return await VendaRepository.deleteVenda(vendaId)
}
async function updateVenda (venda) {
  return await VendaRepository.updateVenda(venda)
}

export default {
  insertVenda,
  getVenda,
  getVendas,
  deleteVenda,
  updateVenda
}
