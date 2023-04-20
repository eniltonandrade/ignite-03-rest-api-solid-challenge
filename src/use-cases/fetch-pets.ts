import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotProvidedError } from './errors/resource-not-provided-error'

interface FetchPetsUseCaseRequest {
  city: string
  age?: number
  size?: 'SMALL' | 'MEDIUM' | 'BIG'
  energyLevel?: 'SMALL' | 'MEDIUM' | 'BIG'
  independenceLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
  environmentType?: 'SMALL' | 'MEDIUM' | 'BIG'
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    city,
    energyLevel,
    environmentType,
    independenceLevel,
    size,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    if (city === '') {
      throw new ResourceNotProvidedError()
    }

    const pets = await this.petsRepository.findMany({
      age,
      city,
      energy_level: energyLevel,
      environment_type: environmentType,
      independence_level: independenceLevel,
      size,
    })

    return { pets }
  }
}
