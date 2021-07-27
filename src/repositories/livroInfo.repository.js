import mongoDb from './mongo.db.js'
const mongo = mongoDb()
const defaultCollection = mongo.collections.LIVRO_INFO

async function insertLivroInfo (livroInfo) {
  try {
    const collection = await mongo.getCollection(defaultCollection)
    return await collection.insertOne(livroInfo)
  } finally {
    mongo.close()
  }
}
async function getAllLivroInfo () {
  try {
    const collection = await mongo.getCollection(defaultCollection)
    return await collection.find({ })
  } finally {
    await mongo.close()
  }
}
async function getLivroInfo (livroId) {
  try {
    const collection = await mongo.getCollection(defaultCollection)
    const livroInfo = await collection.findOne({
      livroId: +livroId
    })
    return livroInfo
  } finally {
    await mongo.close()
  }
}

async function updateLivroInfo (livroInfo) {
  try {
    const collection = await mongo.getCollection(defaultCollection)
    return await collection.findOneAndUpdate(
      { livroId: livroInfo.livroId },
      { $set: livroInfo })
  } finally {
    await mongo.close()
  }
}
async function deleteLivroInfo (livroId) {
  try {
    const collection = await mongo.getCollection(defaultCollection)
    await collection.findOneAndDelete({ livroId: livroId })
  } finally {
    await mongo.close()
  }
}
export default {
  insertLivroInfo,
  getAllLivroInfo,
  getLivroInfo,
  updateLivroInfo,
  deleteLivroInfo
}
