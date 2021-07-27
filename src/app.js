import express from 'express'
import winston from 'winston'

import ClienteRouter from './routes/cliente.route.js'
import AutorRouter from './routes/autor.route.js'
import LivroRouter from './routes/livro.route.js'
import VendaRouter from './routes/venda.route.js'
import auth from './middlewares/auth.js'

const { combine, timestamp, label, printf } = winston.format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`
})
const logger = winston.createLogger({
  level: 'silly',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'store-api.log' })
  ],
  format: combine(
    label({ label: 'store-api' }),
    timestamp(),
    myFormat
  )
})
global.logger = logger

const app = express()
app.use(express.json())

app.use(auth.autenticar)

app.use('/cliente', ClienteRouter)
app.use('/autor', AutorRouter)
app.use('/livro', LivroRouter)
app.use('/venda', VendaRouter)

app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
  res.status(err.status ? err.status : 400).send({ error: err.message })
})

export default app
