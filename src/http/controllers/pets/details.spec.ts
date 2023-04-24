import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Get Pet (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a specific pet', async () => {
    const { orgId } = await createAndAuthenticateOrg(app)

    const createPet = await prisma.pet.create({
      data: {
        age: 7,
        description: 'clean dog',
        energy_level: 'HIGH',
        environment_type: 'BIG',
        independence_level: 'HIGH',
        name: 'Scooby',
        size: 'BIG',
        org_id: orgId,
      },
    })

    const response = await request(app.server)
      .get(`/pets/${createPet.id}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet.name).toEqual('Scooby')
  })
})
