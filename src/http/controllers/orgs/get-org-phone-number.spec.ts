import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Get Org Phone Number (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get phone number of a org', async () => {
    const { orgId } = await createAndAuthenticateOrg(app)

    const getOrgPhoneNumberResponse = await request(app.server)
      .get(`/orgs/${orgId}`)
      .send()

    expect(getOrgPhoneNumberResponse.statusCode).toEqual(200)
    expect(getOrgPhoneNumberResponse.body.org).toEqual(
      expect.objectContaining({
        orgName: 'Org Legal',
        phoneNumber: '+5514999999999',
      }),
    )
  })
})
