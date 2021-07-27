import ClienteRepository from '../repositories/cliente.repository.js'

async function insertCliente (cliente) {
  return await ClienteRepository.insertCliente(cliente)
}
async function getCliente (clienteId) {
  return await ClienteRepository.getCliente(clienteId)
}
async function getClienteByEmail (email) {
  return await ClienteRepository.getClienteByEmail(email)
}
async function getClientes () {
  return await ClienteRepository.getClientes()
}
async function deleteCliente (clienteId) {
  return await ClienteRepository.deleteCliente(clienteId)
}
async function updateCliente (cliente) {
  return await ClienteRepository.updateCliente(cliente)
}
export default {
  insertCliente,
  getCliente,
  getClienteByEmail,
  getClientes,
  deleteCliente,
  updateCliente
}
