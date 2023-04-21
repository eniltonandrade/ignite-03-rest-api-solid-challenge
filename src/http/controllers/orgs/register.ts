import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address_street: z.string(),
    address_number: z.string(),
    address_state: z.string(),
    address_city: z.string(),
    phone: z.string(),
  })

  const {
    name,
    email,
    password,
    address_city,
    address_number,
    address_state,
    address_street,
    phone,
  } = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegisterOrgUseCase()

  await registerUseCase.execute({
    name,
    email,
    password,
    address_city,
    address_number,
    address_state,
    address_street,
    phone,
  })

  return reply.status(201).send()
}
