import { FetchPetsUseCase } from '../fetch-pets'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFetchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsUseCase(petsRepository)

  return useCase
}
