import Venda from '../models/venda.model.js'
import Livro from '../models/livro.model.js'

async function insertVenda (venda) {
  return await Venda.create(venda)
}
async function getVendas () {
  return await Venda.findAll()
}
async function getVendasByLivro (livroId) {
  return await Venda.findAll({
    where: {
      livroId: livroId
    }
  })
}
async function getVendasByCliente (clienteId) {
  return await Venda.findAll({
    where: {
      clienteId: clienteId
    }
  })
}
async function getVendasByAutor (autorId) {
  return await Venda.findAll({
    include: [
      {
        model: Livro,
        where: {
          autorId: autorId
        }
      }
    ]

  })
}
async function getVenda (id) {
  return await Venda.findByPk(id)
}
async function deleteVenda (id) {
  await Venda.destroy({
    where: {
      vendaId: id
    }
  })
}
async function updateVenda (venda) {
  await Venda.update(venda, {
    where: {
      vendaId: venda.vendaId
    }
  })
  return await getVenda(venda.vendaId)
}

export default {
  insertVenda,
  getVendas,
  getVendasByLivro,
  getVendasByCliente,
  getVendasByAutor,
  getVenda,
  updateVenda,
  deleteVenda
}
