import VendaService from '../services/venda.service.js'
import auth from '../middlewares/auth.js'

async function insertVenda (req, res, next) {
  try {
    const venda = req.body
    if (!auth.isAdmin(req.auth.role) && venda.clienteId !== req.auth.userId) {
      throw new Error('Usuario não tem permissão para cadastrar venda')
    }
    res.send(await VendaService.insertVenda(venda))
    global.logger.info(`POST /venda - ${JSON.stringify(venda)}`)
  } catch (error) {
    next(error)
  }
}

async function getVendas (req, res, next) {
  try {
    const { livroId, clienteId, autorId } = req.query
    if (!auth.isAdmin(req.auth.role) && (!clienteId || (clienteId && clienteId !== req.auth.userId))) {
      throw new Error('Usuario não tem permissão para consultar venda de outros clientes')
    }
    res.send(await VendaService.getVendas(livroId, clienteId, autorId))
    global.logger.info('GET /vendas')
  } catch (error) {
    next(error)
  }
}

async function getVenda (req, res, next) {
  try {
    const vendaId = req.params.id
    res.send(await VendaService.getVenda(vendaId))
    global.logger.info(`GET /venda/${vendaId}`)
  } catch (error) {
    next(error)
  }
}
async function updateVenda (req, res, next) {
  try {
    const venda = req.body
    res.send(await VendaService.updateVenda(venda))
    global.logger.info(`PUT /venda ${JSON.stringify(venda)}`)
  } catch (error) {
    next(error)
  }
}
async function deleteVenda (req, res, next) {
  try {
    const vendaId = req.params.id
    await VendaService.deleteVenda(vendaId)
    res.end()
    global.logger.info(`DELETE /venda ${vendaId}`)
  } catch (error) {
    next(error)
  }
}

export default {
  insertVenda,
  getVendas,
  getVenda,
  updateVenda,
  deleteVenda
}
