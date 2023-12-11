import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Olá Mundo'
})

server.post('/jogo', (request, reply) => {
   const {titulo, desenvolvedor, distribuidor, nhoras } = request.body
    database.create({
        titulo: titulo,
        desenvolvedor: desenvolvedor,
        distribuidor: distribuidor,
        nhoras: nhoras
    })
    console.log(database.list())
    return reply.status(201).send()
})

server.get('/jogo', (request) => {
    const search = request.query.search

    console.log(search)
    
    const jogos = database.list(search)
   
    return jogos
})

server.put('/jogo/:id', (request, reply) => {

    const jogoId = request.params.id
    const {titulo, desenvolvedor, distribuidor, nhoras} = request.body
    const jogo = database.update(jogoId, {
        titulo,
        desenvolvedor,
        distribuidor,
        nhoras,
    })
    return reply.status(204).send()
})

server.delete('/jogo/:id', (request, reply) => {
    const jogoId = request.params.id

    database.delete(jogoId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})