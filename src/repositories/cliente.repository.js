import Cliente from '../models/cliente.model.js'

async function insertCliente (cliente) {
  return await Cliente.create(cliente)
}

async function getClientes () {
  return await Cliente.findAll({ raw: true })
}

async function getCliente (id) {
  return await Cliente.findByPk(id)
}
async function getClienteByEmail (email) {
  return await Cliente.findOne({ where: { email: email } })
}

async function deleteCliente (id) {
  await Cliente.destroy({
    where: {
      clienteId: id
    }
  })
}
async function updateCliente (cliente) {
  await Cliente.update(cliente, {
    where: {
      clienteId: cliente.clienteId
    }
  })
  return await getCliente(cliente.clienteId)
}

export default {
  insertCliente,
  getClientes,
  getClienteByEmail,
  getCliente,
  updateCliente,
  deleteCliente
}
