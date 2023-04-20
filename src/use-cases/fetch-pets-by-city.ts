import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotProvidedError } from './errors/resource-not-provided-error'

interface FetchPetsByCityUseCaseRequest {
  city: string
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    if (city === '') {
      throw new ResourceNotProvidedError()
    }

    const pets = await this.petsRepository.searchManyByCity(city)

    return { pets }
  }
}
