import request from 'supertest'
import app from '../src/app.js'
import db from '../src/repositories/db.js'
import { afterAll, expect, describe, beforeAll, test } from '@jest/globals'
import VendaModel from '../src/models/venda.model.js'

describe('Cenário 1', () => {
  const autoraCarolina = {
    nome: 'Carolina Milena Almada',
    email: 'ccarolinamilenaalmada@gmail.com',
    telefone: '83996565550'
  }
  const livroApi = {
    nome: 'APIs em Node.js',
    valor: 90,
    estoque: 25,
    autorId: 1
  }
  const clienteGiovana = {
    nome: 'Giovana Betina Barbosa',
    email: 'giovanabetinabarbosa@gmail.com',
    senha: 'ZjRxDsNQt4',
    telefone: '27998835914',
    endereco: 'Rua Tancredo Neves 639, Serra-ES'
  }

  beforeAll(async () => {
    db.options.logging = false
    await db.query('TRUNCATE vendas, clientes, livros, autores RESTART IDENTITY;')
  })
  afterAll(async () => {
    await db.query('TRUNCATE vendas, clientes, livros, autores RESTART IDENTITY;')
    await db.close()
  })

  test('Cria autor e verifica se foi criado corretamente', async () => {
    await request(app)
      .post('/autor')
      .auth('admin', 'desafio-igti-nodejs')
      .send(autoraCarolina)

    const res = await request(app)
      .get('/autor')
      .auth('admin', 'desafio-igti-nodejs')

    const autorCriado = res.body[0]

    expect(autorCriado).toMatchSnapshot()
    expect(autorCriado.nome).toBe(autoraCarolina.nome)
    expect(autorCriado.email).toBe(autoraCarolina.email)

    autoraCarolina.autorId = autorCriado.autorId
  })
  test('Cria livro e verifica se foi criado corretamente', async () => {
    await request(app)
      .post('/livro')
      .auth('admin', 'desafio-igti-nodejs')
      .send(livroApi)

    const res = await request(app)
      .get('/livro')
      .auth('admin', 'desafio-igti-nodejs')
    const livroCriado = res.body[0]

    expect(livroCriado).toMatchSnapshot()
    expect(livroCriado.nome).toBe(livroApi.nome)
    expect(livroCriado.autorId).toBe(livroApi.autorId)

    livroApi.livroId = livroCriado.livroId
  })
  test('Cria cliente e verifica se foi criado corretamente', async () => {
    await request(app)
      .post('/cliente')
      .auth('admin', 'desafio-igti-nodejs')
      .send(clienteGiovana)

    const res = await request(app)
      .get('/cliente')
      .auth('admin', 'desafio-igti-nodejs')

    const clienteCriado = res.body[0]

    expect(clienteCriado).toMatchSnapshot()
    expect(clienteCriado.nome).toBe(clienteGiovana.nome)
    expect(clienteCriado.email).toBe(clienteGiovana.email)

    clienteGiovana.clienteId = clienteCriado.clienteId
  })

  test('Buscar livro usando usuario cadastrado', async () => {
    const res = await request(app)
      .get('/livro')
      .auth(clienteGiovana.email, clienteGiovana.senha)
    expect(res.status).toBe(200)
    expect(res.body).toMatchSnapshot()
  })

  test('Cadastrar venda com o cliente e livro criados', async () => {
    const venda = {
      valor: 90,
      data: '2000-08-10',
      clienteId: clienteGiovana.clienteId,
      livroId: livroApi.livroId
    }
    await request(app)
      .post('/venda')
      .auth(clienteGiovana.email, clienteGiovana.senha)
      .send(venda)

    const vendaCriada = await VendaModel.findAll({ raw: true })
    expect(vendaCriada.length).toBe(1)
    expect(vendaCriada).toMatchSnapshot()
  })
})
