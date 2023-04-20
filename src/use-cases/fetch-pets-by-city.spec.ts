import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'

let petsRepository: InMemoryPetsRepository

let sut: FetchPetsByCityUseCase

describe('Fetch User Check-In History Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should be able to fetch pets by city', async () => {
    petsRepository.orgs.push({
      address_city: 'Sorocaba',
      address_number: '2',
      address_state: 'São Paulo',
      address_street: 'Rua do Meio',
      email: 'email@example.com',
      id: 'ORG01',
      created_at: new Date(),
      name: 'ORG 1',
      password_hash: 'password',
      phone: '00000000',
    })
    petsRepository.orgs.push({
      address_city: 'Sorocaba',
      address_number: '2',
      address_state: 'São Paulo',
      address_street: 'Rua do Meio',
      email: 'email@example.com',
      id: 'ORG04',
      created_at: new Date(),
      name: 'ORG 4',
      password_hash: 'password',
      phone: '00000000',
    })

    await petsRepository.create({
      age: '7 years old',
      description: 'clean dog',
      energy_level: 'HIGH',
      environment_type: 'lots of grass',
      independence_level: 'HIGH',
      name: 'Scooby',
      org_id: 'ORG01',
      size: 'BIG',
    })

    await petsRepository.create({
      age: '7 years old',
      description: 'clean dog',
      energy_level: 'HIGH',
      environment_type: 'lots of grass',
      independence_level: 'HIGH',
      name: 'Scooby',
      org_id: 'ORG04',
      size: 'BIG',
    })
    const { pets } = await sut.execute({
      city: 'Sorocaba',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ org_id: 'ORG01' }),
      expect.objectContaining({ org_id: 'ORG04' }),
    ])
  })
})
