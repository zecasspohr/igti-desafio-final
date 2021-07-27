import { validationResult } from 'express-validator'

async function validaRequest (req, res, next) {
  const erros = validationResult(req)
  if (!erros.isEmpty()) {
    return res.status(400).json({ erro: erros.array() })
  }
  next()
}

export default {
  validaRequest
}
