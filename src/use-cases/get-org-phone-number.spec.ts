import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetOrgPhoneNumberCase } from './get-org-phone-number'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgPhoneNumberCase

describe('Get Org Phone Number Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgPhoneNumberCase(orgsRepository)
  })

  it('should be able to get org phone number', async () => {
    const createOrg = await orgsRepository.create({
      address_city: 'Sorocaba',
      address_number: '43',
      address_state: 'São Paulo',
      address_street: 'Rua do Meio',
      email: 'org@example.com',
      name: 'Joao de Oliveira',
      password_hash: await hash('123456', 6),
      phone: '+5514999999999',
    })

    const { orgName, phoneNumber } = await sut.execute({
      orgId: createOrg.id,
    })

    expect(orgName).toEqual('Joao de Oliveira')
    expect(phoneNumber).toEqual('+5514999999999')
  })

  it('should not be able to get user profile with wrong user id', async () => {
    await expect(() =>
      sut.execute({
        orgId: '12341234',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
