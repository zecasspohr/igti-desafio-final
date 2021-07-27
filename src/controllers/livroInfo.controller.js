import LivroInfoService from '../services/livroInfo.service.js'

async function insertLivroInfo (req, res, next) {
  try {
    const livroInfo = req.body
    res.send(await LivroInfoService.insertLivroInfo(livroInfo))
    global.logger.info(`POST /livroInfo - ${JSON.stringify(livroInfo)}`)
  } catch (error) {
    next(error)
  }
}

async function getLivroInfo (req, res, next) {
  try {
    const livroInfoId = req.params.id
    res.send(await LivroInfoService.getLivroInfo(livroInfoId))
    global.logger.info(`GET /livroInfo/${livroInfoId}`)
  } catch (error) {
    next(error)
  }
}
async function updateLivroInfo (req, res, next) {
  try {
    const livroInfo = req.body
    res.send(await LivroInfoService.updateLivroInfo(livroInfo))
    global.logger.info(`PUT /livroInfo ${JSON.stringify(livroInfo)}`)
  } catch (error) {
    next(error)
  }
}
async function deleteLivroInfo (req, res, next) {
  try {
    const livroId = req.params.id
    await LivroInfoService.deleteLivroInfo(livroId)
    res.end()
    global.logger.info(`DELETE /livroInfo ${livroId}`)
  } catch (error) {
    next(error)
  }
}
async function insertAvaliacao (req, res, next) {
  try {
    const livroId = req.params.id
    const avaliacao = req.body
    res.send(await LivroInfoService.insertAvaliacao(livroId, avaliacao))
    global.logger.info(`POST /livroInfo/${livroId}/avaliacao - ${JSON.stringify(avaliacao)}`)
  } catch (error) {
    next(error)
  }
}
async function deleteAvaliacao (req, res, next) {
  try {
    const livroId = req.params.id
    const indexAvaliacao = req.params.index
    await LivroInfoService.deleteAvaliacao(livroId, indexAvaliacao)
    res.end()
    global.logger.info(`POST /livroInfo/${livroId}/avaliacao/${indexAvaliacao}`)
  } catch (error) {
    next(error)
  }
}
export default {
  insertLivroInfo,
  getLivroInfo,
  updateLivroInfo,
  deleteLivroInfo,
  insertAvaliacao,
  deleteAvaliacao
}
