import express from 'express'
import ClienteController from '../controllers/cliente.controller.js'
import { check } from 'express-validator'
import validator from './validator.js'
import auth from '../middlewares/auth.js'

const route = express.Router()
// add express validator
route.post('/',
  auth.autorizar(),
  check('nome', 'Nome deve ser informado!').notEmpty(),
  check('email', 'email deve ser informado!').notEmpty(),
  check('senha', 'senha deve ser informada!').notEmpty(),
  check('telefone', 'telefone deve ser informado!').notEmpty(),
  check('endereco', 'endereco deve ser informado!').notEmpty(),
  validator.validaRequest,
  ClienteController.insertCliente)

route.get('/:id',
  auth.autorizar(),
  ClienteController.getCliente)
route.get('/',
  auth.autorizar(),
  ClienteController.getClientes)

route.put('/',
  auth.autorizar('role'),
  check('clienteId', 'ID deve ser informado!').notEmpty(),
  check('nome', 'Nome deve ser informado!').notEmpty(),
  check('email', 'email deve ser informado!').notEmpty(),
  check('senha', 'senha deve ser informada!').notEmpty(),
  check('telefone', 'telefone deve ser informado!').notEmpty(),
  check('endereco', 'endereco deve ser informado!').notEmpty(),
  validator.validaRequest,
  ClienteController.updateCliente)

route.delete('/:id',
  auth.autorizar(),
  ClienteController.deleteCliente)

export default route
