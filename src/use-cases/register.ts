import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  address_state: string
  address_city: string
  address_street: string
  address_number: string
  phone: string
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    address_city,
    address_number,
    address_state,
    address_street,
    email,
    name,
    password,
    phone,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)
    const org = await this.orgRepository.create({
      address_city,
      address_number,
      address_state,
      address_street,
      email,
      name,
      password_hash,
      phone,
    })

    return { org }
  }
}
