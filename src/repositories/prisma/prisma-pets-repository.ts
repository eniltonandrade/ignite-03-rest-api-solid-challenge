import { Prisma, Level, Size } from '@prisma/client'
import { FindManyParams, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })
    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })
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
    const pets = await prisma.pet.findMany({
      include: {
        org: {
          select: {
            address_city: true,
          },
        },
      },
      where: {
        org: {
          address_city: city,
        },
        energy_level: Level[energy_level as keyof typeof Level],
        environment_type: Size[environment_type as keyof typeof Size],
        age,
        independence_level: Level[independence_level as keyof typeof Level],
        size: Size[size as keyof typeof Size],
      },
    })
    return pets
  }
}
