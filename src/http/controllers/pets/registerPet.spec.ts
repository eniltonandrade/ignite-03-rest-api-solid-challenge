import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a Pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `bearer ${token}`)
      .send({
        age: 7,
        description: 'clean dog',
        energy_level: 'HIGH',
        environment_type: 'BIG',
        independence_level: 'HIGH',
        name: 'Scooby',
        size: 'BIG',
      })

    expect(response.statusCode).toEqual(201)
  })
})
