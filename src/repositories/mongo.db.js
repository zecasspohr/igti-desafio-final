import mongodb from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const myMongo = () => {
  const collections = Object.freeze({
    LIVRO_INFO: 'livroInfo'
  })
  let client
  async function getClient () {
    const uri = process.env.MONGO_CONNECTION

    return new mongodb.MongoClient(uri)
  }
  async function connect () {
    client = await getClient()
    return client.connect()
  }
  async function getDb () {
    const connection = await connect()
    return connection.db('livraria')
  }

  async function getCollection (collection) {
    const db = await getDb()
    return db.collection(collection)
  }
  async function close () {
    if (client) {
      await client.close()
    }
  }
  return {
    close,
    getCollection,
    collections
  }
}
export default myMongo
