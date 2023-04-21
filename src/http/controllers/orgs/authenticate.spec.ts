import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Test 01',
      email: 'test@test2.com',
      password: '123456',
      address_city: 'Sorocaba',
      address_number: '33C',
      address_state: 'São Paulo',
      address_street: 'Rua do Meio',
      phone: '99999999',
    })

    const response = await request(app.server).post('/orgs/sessions').send({
      email: 'test@test2.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
