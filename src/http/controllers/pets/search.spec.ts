import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Search Pets (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets pets', async () => {
    const { orgId, token } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        age: 7,
        description: 'clean dog',
        energy_level: 'HIGH',
        environment_type: 'BIG',
        independence_level: 'HIGH',
        name: 'Bob',
        size: 'BIG',
        org_id: orgId,
      })

    const response = await request(app.server).post('/search').send({
      city: 'Sorocaba',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Bob',
      }),
    ])
  })
})
