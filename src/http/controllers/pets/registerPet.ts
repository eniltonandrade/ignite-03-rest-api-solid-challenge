import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const SIZE_VALUES = ['SMALL', 'MEDIUM', 'BIG'] as const
  const LEVEL_VALUES = ['HIGH', 'MEDIUM', 'LOW'] as const

  const registerPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.coerce.number(),
    size: z.enum(SIZE_VALUES),
    energy_level: z.enum(LEVEL_VALUES),
    independence_level: z.enum(LEVEL_VALUES),
    environment_type: z.enum(SIZE_VALUES),
  })

  const {
    age,
    description,
    energy_level,
    environment_type,
    independence_level,
    name,
    size,
  } = registerPetBodySchema.parse(request.body)

  const registerPetUseCase = makeRegisterPetUseCase()

  await registerPetUseCase.execute({
    age,
    description,
    energy_level,
    environment_type,
    independence_level,
    name,
    size,
    orgId: request.user.sub,
  })

  return reply.status(201).send()
}
