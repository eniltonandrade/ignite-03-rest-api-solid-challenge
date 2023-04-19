import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

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
}
