import { expect, describe, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgRepository)
  })

  it('should be able to authenticate', async () => {
    await orgRepository.create({
      address_city: 'Sorocaba',
      address_number: '43',
      address_state: 'São Paulo',
      address_street: 'Rua do Meio',
      email: 'org@example.com',
      name: 'Joao de Oliveira',
      password_hash: await hash('123456', 6),
      phone: '+5514999999999',
    })

    const { org } = await sut.execute({
      email: 'org@example.com',
      password: '123456',
    })

    const isPasswordCorrectHashed = await compare('123456', org.password_hash)
    expect(isPasswordCorrectHashed).toBe(true)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'org@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgRepository.create({
      address_city: 'Sorocaba',
      address_number: '43',
      address_state: 'São Paulo',
      address_street: 'Rua do Meio',
      email: 'org@example.com',
      name: 'Joao de Oliveira',
      password_hash: await hash('123456', 6),
      phone: '+5514999999999',
    })

    await expect(() =>
      sut.execute({
        email: 'org@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
