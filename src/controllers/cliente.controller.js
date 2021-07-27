import ClienteService from '../services/cliente.service.js'
import auth from '../middlewares/auth.js'

async function insertCliente (req, res, next) {
  try {
    const cliente = req.body
    res.send(await ClienteService.insertCliente(cliente))
    global.logger.info(`POST /cliente - ${JSON.stringify(cliente)}`)
  } catch (error) {
    next(error)
  }
}

async function getClientes (_, res, next) {
  try {
    res.send(await ClienteService.getClientes())
    global.logger.info('GET /clientes')
  } catch (error) {
    next(error)
  }
}

async function getCliente (req, res, next) {
  try {
    const clienteId = req.params.id
    res.send(await ClienteService.getCliente(clienteId))
    global.logger.info(`GET /cliente/${clienteId}`)
  } catch (error) {
    next(error)
  }
}
async function updateCliente (req, res, next) {
  try {
    const cliente = req.body
    // Usuário que não for admin só tem permissão para atualiar os próprios dados
    if (!auth.isAdmin(req.auth.role) && cliente.clienteId !== req.auth.userId) {
      throw new Error('Sem permissão para atualizar dados de outro usuario!')
    }
    res.send(await ClienteService.updateCliente(cliente))
    global.logger.info(`PUT /cliente ${JSON.stringify(cliente)}`)
  } catch (error) {
    next(error)
  }
}
async function deleteCliente (req, res, next) {
  try {
    const clienteId = req.params.id
    await ClienteService.deleteCliente(clienteId)
    res.end()
    global.logger.info(`DELETE /cliente ${clienteId}`)
  } catch (error) {
    next(error)
  }
}

export default {
  insertCliente,
  getClientes,
  getCliente,
  updateCliente,
  deleteCliente
}
