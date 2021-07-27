import express from 'express'
import LivroController from '../controllers/livro.controller.js'
import { check } from 'express-validator'
import validator from './validator.js'
import livroInfoController from '../controllers/livroInfo.controller.js'
import auth from '../middlewares/auth.js'

const route = express.Router()
// add express validator
route.post('/',
  auth.autorizar(),
  check('nome', 'Nome deve ser informado!').notEmpty(),
  check('valor', 'valor deve ser informado!').notEmpty().isFloat(),
  check('autorId', 'Autor deve ser informada!').notEmpty().isInt(),
  validator.validaRequest,
  LivroController.insertLivro)

route.get('/', auth.autorizar('role'))
route.get('/:id',
  LivroController.getLivro)
route.get('/', LivroController.getLivros)

route.put('/',
  auth.autorizar(),
  check('livroId', 'ID deve ser informado!').notEmpty(),
  check('nome', 'Nome não pode ser alterado!').isEmpty(),
  check('valor', 'valor deve ser informado!').notEmpty().isFloat(),
  check('autorId', 'Autor não pode ser alterado!').isEmpty(),
  validator.validaRequest,
  LivroController.updateLivro)

route.delete('/:id', auth.autorizar(), LivroController.deleteLivro)

route.post('/info/', auth.autorizar(), livroInfoController.insertLivroInfo)
route.post('/:id/avaliacao', auth.autorizar('role'), livroInfoController.insertAvaliacao)
route.put('/info/', auth.autorizar(), livroInfoController.updateLivroInfo)
route.delete('/info/:id', auth.autorizar(), livroInfoController.deleteLivroInfo)
route.delete('/:id/avaliacao/:index', auth.autorizar(), livroInfoController.deleteAvaliacao)

export default route
