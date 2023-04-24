import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const SIZE_VALUES = ['SMALL', 'MEDIUM', 'BIG'] as const
  const LEVEL_VALUES = ['HIGH', 'MEDIUM', 'LOW'] as const

  const searchPetBodySchema = z.object({
    city: z.string(),
    age: z.coerce.number().optional(),
    size: z.enum(SIZE_VALUES).optional(),
    energy_level: z.enum(LEVEL_VALUES).optional(),
    independence_level: z.enum(LEVEL_VALUES).optional(),
    environment_type: z.enum(SIZE_VALUES).optional(),
  })

  const {
    age,
    energy_level,
    environment_type,
    independence_level,
    city,
    size,
  } = searchPetBodySchema.parse(request.body)

  const searchPetUseCase = makeFetchPetsUseCase()

  const { pets } = await searchPetUseCase.execute({
    city,
    age,
    energyLevel: energy_level,
    environmentType: environment_type,
    independenceLevel: independence_level,
    size,
  })

  return reply.status(200).send({
    pets,
  })
}
