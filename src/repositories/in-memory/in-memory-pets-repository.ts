import { Prisma, Pet, Org } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { FindManyParams, PetsRepository } from '../pets-repository'

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

  async findMany(filters: FindManyParams) {
    const {
      city,
      age,
      energy_level,
      environment_type,
      independence_level,
      size,
    } = filters
    const result: Pet[][] = []
    let pets: Pet[] = []
    let filteredPets: Pet[] = []
    const orgs = this.orgs.filter((item) => item.address_city === city)

    orgs.forEach((org) => {
      result.push(this.items.filter((item) => item.org_id === org.id))
    })

    for (let i = 0; i < result.length; i++) {
      pets = pets.concat(result[i])
    }
    if (independence_level || age || energy_level || environment_type || size) {
      filteredPets = pets.filter(
        (pet) =>
          (independence_level === undefined ||
            pet.independence_level === independence_level) &&
          (environment_type === undefined ||
            pet.environment_type === environment_type) &&
          (size === undefined || pet.size === size) &&
          (energy_level === undefined || pet.energy_level === energy_level) &&
          (age === undefined || pet.age === age),
      )
      return filteredPets
    }
    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)
    if (!pet) {
      return null
    }

    return pet
  }
}
