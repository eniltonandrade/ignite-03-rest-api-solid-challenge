import { FastifyInstance } from 'fastify'
import { registerPet } from './registerPet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { details } from './details'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/search', search)
  app.post('/pets', { onRequest: [verifyJWT] }, registerPet)
  app.get('/pets/:id', details)
}
