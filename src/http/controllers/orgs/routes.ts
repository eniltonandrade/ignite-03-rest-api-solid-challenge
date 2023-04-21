import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { getOrgPhoneNumber } from './get-org-phone-number'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/orgs/sessions', authenticate)
  app.patch('/token/refresh', refresh)
  app.get('/orgs/:orgId', getOrgPhoneNumber)
}
