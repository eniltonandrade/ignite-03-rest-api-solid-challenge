import { Pet, Prisma } from '@prisma/client'

export interface FindManyParams {
  city: string
  age?: number
  size?: 'SMALL' | 'MEDIUM' | 'BIG'
  energy_level?: 'LOW' | 'MEDIUM' | 'HIGH'
  independence_level?: 'LOW' | 'MEDIUM' | 'HIGH'
  environment_type?: 'SMALL' | 'MEDIUM' | 'BIG'
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findMany(filters: FindManyParams): Promise<Pet[]>
}
