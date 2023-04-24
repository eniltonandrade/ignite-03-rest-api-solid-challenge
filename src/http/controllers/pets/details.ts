import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPetParamsSchema.parse(request.params)

  const getPetUseCase = makeGetPetDetailsUseCase()

  const { pet } = await getPetUseCase.execute({
    petId: id,
  })

  return reply.status(200).send({
    pet,
  })
}
