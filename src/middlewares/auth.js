import ClienteService from '../services/cliente.service.js'
import basicAuth from 'express-basic-auth'

async function autenticar (req, res, next) {
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ error: 'Cabeçalho de autorização não encontrado!' })
  }
  const base64Credentials = req.headers.authorization.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
  const [email, senha] = credentials.split(':')
  // Validar administrador
  if (basicAuth.safeCompare(email, 'admin') && basicAuth.safeCompare(senha, 'desafio-igti-nodejs')) {
    req.auth = {
      user: 'admin',
      role: 'admin'
    }
    return next()
  }
  const user = await ClienteService.getClienteByEmail(email)
  if (!user) {
    return res.status(401).json({ message: 'Usuario não encontrado' })
  }
  if (basicAuth.safeCompare(user.senha, senha)) {
    req.auth = {
      userId: user.clienteId,
      user: email,
      role: 'role'
    }
    return next()
  }
  return res.status(401).json({ message: 'Senha invalida' })
}
function autorizar (...permitidos) {
  const ehPermitido = role => permitidos.indexOf(role) > -1
  return (req, res, next) => {
    // se não tiver usuario retorna erro por não ter passado pela autenticação
    if (!req.auth.user) { return res.status(403).send('User not found') }
    // se usuario for admin libera por padrão
    if (isAdmin(req.auth.role) || ehPermitido(req.auth.role)) { return next() }

    res.status(401).send('Usuario sem autorização')
  }
}
const adminRole = 'admin'
function isAdmin (role) {
  return role === adminRole
}
export default {
  autenticar,
  autorizar,
  isAdmin
}
