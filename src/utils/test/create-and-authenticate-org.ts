import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(
  app: FastifyInstance,
  isAdmin = false,
) {
  const org = await prisma.org.create({
    data: {
      name: 'Org Legal',
      email: 'email@example.com',
      password_hash: await hash('123456', 6),
      address_state: 'São Paulo',
      address_city: 'Sorocaba',
      address_street: 'Rua do Meio',
      address_number: '44',
      phone: '+5514999999999',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'email@example.com',
    password: '123456',
  })

  const { token } = authResponse.body
  const { id } = org

  return { token, orgId: id }
}
