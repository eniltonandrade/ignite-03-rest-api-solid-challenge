import { Pet, Prisma } from '@prisma/client'

export interface FindManyParams {
  city: string
  age?: number
  size?: 'SMALL' | 'MEDIUM' | 'BIG'
  energy_level?: 'SMALL' | 'MEDIUM' | 'BIG'
  independence_level?: 'LOW' | 'MEDIUM' | 'HIGH'
  environment_type?: 'SMALL' | 'MEDIUM' | 'BIG'
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findMany(filters: FindManyParams): Promise<Pet[]>
}
