import LivroInfoRepository from '../repositories/livroInfo.repository.js'

async function insertLivroInfo (livroInfo) {
  return await LivroInfoRepository.insertLivroInfo(livroInfo)
}
async function getLivroInfo (livroId) {
  return await LivroInfoRepository.getLivroInfo(livroId)
}
async function getAllLivroInfo () {
  return await LivroInfoRepository.getAllLivroInfo()
}
async function deleteLivroInfo (livroId) {
  return await LivroInfoRepository.deleteLivroInfo(livroId)
}
async function updateLivroInfo (livroInfo) {
  return await LivroInfoRepository.updateLivroInfo(livroInfo)
}
async function insertAvaliacao (livroId, avaliacao) {
  const livroInfo = await getLivroInfo(livroId)
  livroInfo.avaliacoes = !livroInfo.avaliacoes ? [] : livroInfo.avaliacoes
  livroInfo.avaliacoes.push(avaliacao)
  await updateLivroInfo(livroInfo)
  return await getLivroInfo(livroId)
}
async function deleteAvaliacao (livroId, index) {
  const livroInfo = await getLivroInfo(livroId)
  livroInfo.avaliacoes = !livroInfo.avaliacoes ? [] : livroInfo.avaliacoes
  if (livroInfo.avaliacoes.length > index) {
    livroInfo.avaliacoes.splice(index, 1)
    await updateLivroInfo(livroInfo)
  }
}
export default {
  insertLivroInfo,
  getLivroInfo,
  getAllLivroInfo,
  deleteLivroInfo,
  updateLivroInfo,
  insertAvaliacao,
  deleteAvaliacao

}
