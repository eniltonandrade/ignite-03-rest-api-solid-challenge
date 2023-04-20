import { Prisma, Pet, Org } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  public orgs: Org[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      age: data.age,
      created_at: new Date(),
      description: data.description,
      energy_level: data.energy_level,
      environment_type: data.environment_type,
      independence_level: data.independence_level,
      name: data.name,
      size: data.size,
      org_id: data.org_id,
    }
    this.items.push(pet)

    return pet
  }

  async searchManyByCity(city: string) {
    const result: Pet[][] = []
    let pets: Pet[] = []
    const orgs = this.orgs.filter((item) => item.address_city === city)

    orgs.forEach((org) => {
      result.push(this.items.filter((item) => item.org_id === org.id))
    })

    for (let i = 0; i < result.length; i++) {
      pets = pets.concat(result[i])
    }

    return pets
  }
}
