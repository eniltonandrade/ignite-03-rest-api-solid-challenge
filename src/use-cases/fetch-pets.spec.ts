import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchPetsUseCase } from './fetch-pets'
import { ResourceNotProvidedError } from './errors/resource-not-provided-error'

let petsRepository: InMemoryPetsRepository

let sut: FetchPetsUseCase

describe('Fetch Pets by City Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository)
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
      age: 7,
      description: 'clean dog',
      energy_level: 'HIGH',
      environment_type: 'BIG',
      independence_level: 'HIGH',
      name: 'Scooby',
      org_id: 'ORG01',
      size: 'BIG',
    })

    await petsRepository.create({
      age: 7,
      description: 'clean dog',
      energy_level: 'HIGH',
      environment_type: 'BIG',
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

  it('should be not able to fetch pets without a city', async () => {
    await expect(() =>
      sut.execute({
        city: '',
      }),
    ).rejects.toBeInstanceOf(ResourceNotProvidedError)
  })

  it('should be able to fetch pets by city and Independence level filter', async () => {
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
      age: 7,
      description: 'clean dog',
      energy_level: 'HIGH',
      environment_type: 'BIG',
      independence_level: 'LOW',
      name: 'Scooby',
      org_id: 'ORG01',
      size: 'BIG',
    })

    await petsRepository.create({
      age: 7,
      description: 'clean dog',
      energy_level: 'HIGH',
      environment_type: 'BIG',
      independence_level: 'HIGH',
      name: 'Scooby',
      org_id: 'ORG04',
      size: 'BIG',
    })
    const { pets } = await sut.execute({
      city: 'Sorocaba',
      environmentType: 'BIG',
      independenceLevel: 'LOW',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ org_id: 'ORG01' })])
  })
})
