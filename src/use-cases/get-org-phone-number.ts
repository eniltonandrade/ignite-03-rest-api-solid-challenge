import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface GetOrgPhoneNumberCaseRequest {
  orgId: string
}

interface GetOrgPhoneNumberCaseResponse {
  orgName: string
  phoneNumber: string
}

export class GetOrgPhoneNumberCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgPhoneNumberCaseRequest): Promise<GetOrgPhoneNumberCaseResponse> {
    const org = await this.orgRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return {
      orgName: org.name,
      phoneNumber: org.phone,
    }
  }
}
