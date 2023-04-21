import { GetOrgPhoneNumberCase } from '../get-org-phone-number'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeGetOrgPhoneNumberUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new GetOrgPhoneNumberCase(orgsRepository)

  return useCase
}
