import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'

let petRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      age: '7 years old',
      description: 'clean dog',
      energy_level: 'HIGH',
      environment_type: 'lots of grass',
      independence_level: 'HIGH',
      name: 'Scooby',
      orgId: 'org-1',
      size: 'BIG',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
