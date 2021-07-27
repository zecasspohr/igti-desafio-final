import LivroService from '../services/livro.service.js'

async function insertLivro (req, res, next) {
  try {
    const livro = req.body
    res.send(await LivroService.insertLivro(livro))
    global.logger.info(`POST /livro - ${JSON.stringify(livro)}`)
  } catch (error) {
    next(error)
  }
}

async function getLivros (req, res, next) {
  try {
    res.send(await LivroService.getLivros(req.query.autorId))
    global.logger.info('GET /livros')
  } catch (error) {
    next(error)
  }
}

async function getLivro (req, res, next) {
  try {
    const livroId = req.params.id
    res.send(await LivroService.getLivro(livroId))
    global.logger.info(`GET /livro/${livroId}`)
  } catch (error) {
    next(error)
  }
}
async function updateLivro (req, res, next) {
  try {
    const livro = req.body
    res.send(await LivroService.updateLivro(livro))
    global.logger.info(`PUT /livro ${JSON.stringify(livro)}`)
  } catch (error) {
    next(error)
  }
}
async function deleteLivro (req, res, next) {
  try {
    const livroId = req.params.id
    await LivroService.deleteLivro(livroId)
    res.end()
    global.logger.info(`DELETE /livro ${livroId}`)
  } catch (error) {
    next(error)
  }
}

export default {
  insertLivro,
  getLivros,
  getLivro,
  updateLivro,
  deleteLivro
}
