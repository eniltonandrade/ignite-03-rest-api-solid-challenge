import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

let orgRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgRepository)
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      address_city: 'Sorocaba',
      address_number: '43',
      address_state: 'São Paulo',
      address_street: 'Rua do Meio',
      email: 'org@example.com',
      name: 'Joao de Oliveira',
      password: '123456',
      phone: '+5514999999999',
    })

    const isPasswordCorrectHashed = await compare('123456', org.password_hash)
    expect(isPasswordCorrectHashed).toBe(true)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      address_city: 'Sorocaba',
      address_number: '43',
      address_state: 'São Paulo',
      address_street: 'Rua do Meio',
      email: 'org@example.com',
      name: 'Joao de Oliveira',
      password: '123456',
      phone: '+5514999999999',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
