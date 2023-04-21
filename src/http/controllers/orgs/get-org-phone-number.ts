import { makeGetOrgPhoneNumberUseCase } from '@/use-cases/factories/make-get-org-phone-number-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOrgPhoneNumber(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPhoneNumberParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const { orgId } = getPhoneNumberParamsSchema.parse(request.params)

  const getOrgPhoneNumberUseCase = makeGetOrgPhoneNumberUseCase()

  const { orgName, phoneNumber } = await getOrgPhoneNumberUseCase.execute({
    orgId,
  })

  return reply.status(200).send({
    org: {
      orgName,
      phoneNumber,
    },
  })
}
