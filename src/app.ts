import { fastify as f } from 'fastify';

const fastify = f({ logger: true })

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.listen(3000)