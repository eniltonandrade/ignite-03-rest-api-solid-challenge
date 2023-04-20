import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface RegisterPetUseCaseRequest {
  name: string
  description: string
  age: number
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  energy_level: 'HIGH' | 'MEDIUM' | 'LOW'
  independence_level: 'HIGH' | 'MEDIUM' | 'LOW'
  environment_type: 'SMALL' | 'MEDIUM' | 'BIG'
  orgId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    age,
    description,
    energy_level,
    environment_type,
    independence_level,
    name,
    size,
    orgId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petRepository.create({
      age,
      description,
      energy_level,
      environment_type,
      independence_level,
      name,
      size,
      org_id: orgId,
    })

    return { pet }
  }
}
