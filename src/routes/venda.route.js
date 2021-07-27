import express from 'express'
import VendaController from '../controllers/venda.controller.js'
import validator from './validator.js'
import { check } from 'express-validator'
import auth from '../middlewares/auth.js'

const route = express.Router()
// add express validator
route.post('/',
  auth.autorizar('role'),
  check('data', 'Data deve ser informado!').notEmpty(),
  check('clienteId', 'Cliente deve ser informado!').notEmpty().isInt(),
  check('livroId', 'Livro deve ser informado!').notEmpty().isInt(),
  validator.validaRequest,
  VendaController.insertVenda)
route.get('/:id', auth.autorizar('role'), VendaController.getVenda)
route.get('/', auth.autorizar('role'), VendaController.getVendas)
route.put('/', auth.autorizar(), VendaController.updateVenda)
route.delete('/:id', auth.autorizar(), VendaController.deleteVenda)

export default route
