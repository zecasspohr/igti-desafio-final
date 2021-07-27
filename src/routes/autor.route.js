import express from 'express'
import AutorController from '../controllers/autor.controller.js'
import { check } from 'express-validator'
import validator from './validator.js'
import auth from '../middlewares/auth.js'

const route = express.Router()

route.use(auth.autorizar('admin'))
// add express validator
route.post('/',
  check('nome', 'Nome deve ser informado!').notEmpty(),
  check('email', 'Email deve ser informado!').notEmpty(),
  check('telefone', 'Telefone deve ser informado!').notEmpty(),
  validator.validaRequest,
  AutorController.insertAutor)

route.get('/:id', AutorController.getAutor)
route.get('/', AutorController.getAutors)

route.put('/',
  check('autorId', 'ID deve ser informado!').notEmpty(),
  check('nome', 'Nome deve ser informado!').notEmpty(),
  check('email', 'Email deve ser informado!').notEmpty(),
  check('telefone', 'Telefone deve ser informado!').notEmpty(),
  validator.validaRequest,
  AutorController.updateAutor)

route.delete('/:id', AutorController.deleteAutor)

export default route
