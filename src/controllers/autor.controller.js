import AutorService from '../services/autor.service.js'

async function insertAutor (req, res, next) {
  try {
    const autor = req.body
    res.send(await AutorService.insertAutor(autor))
    global.logger.info(`POST /autor - ${JSON.stringify(autor)}`)
  } catch (error) {
    next(error)
  }
}

async function getAutors (_, res, next) {
  try {
    res.send(await AutorService.getAutors())
    global.logger.info('GET /autors')
  } catch (error) {
    next(error)
  }
}

async function getAutor (req, res, next) {
  try {
    const autorId = req.params.id
    res.send(await AutorService.getAutor(autorId))
    global.logger.info(`GET /autor/${autorId}`)
  } catch (error) {
    next(error)
  }
}
async function updateAutor (req, res, next) {
  try {
    const autor = req.body
    res.send(await AutorService.updateAutor(autor))
    global.logger.info(`PUT /autor ${JSON.stringify(autor)}`)
  } catch (error) {
    next(error)
  }
}
async function deleteAutor (req, res, next) {
  try {
    const autorId = req.params.id
    await AutorService.deleteAutor(autorId)
    res.end()
    global.logger.info(`DELETE /autor ${autorId}`)
  } catch (error) {
    next(error)
  }
}

export default {
  insertAutor,
  getAutors,
  getAutor,
  updateAutor,
  deleteAutor
}
