import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'

let petRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petRepository)
  })

  it('should be able to get user profile', async () => {
    const createPet = await petRepository.create({
      age: 7,
      description: 'clean dog',
      energy_level: 'HIGH',
      environment_type: 'BIG',
      independence_level: 'HIGH',
      name: 'Scooby',
      org_id: 'org-1',
      size: 'BIG',
    })

    const { pet } = await sut.execute({
      petId: createPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Scooby')
  })

  it('should not be able to get user profile with wrong user id', async () => {
    await expect(() =>
      sut.execute({
        petId: '12341234',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
