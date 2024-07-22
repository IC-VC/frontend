const BASE_URL = 'https://3r4gx-wqaaa-aaaaq-aaaia-cai.raw.icp0.io'

export interface SNS {
  index: number
  canister_ids: SnsCanisterIds
  meta: MetaData
  lifecycle: {
    lifecycle: number
  }
  icrc1_metadata: any[][]
}

interface SnsCanisterIds {
  root_canister_id: string
  governance_canister_id: string
  index_canister_id: string
  swap_canister_id: string
  ledger_canister_id: string
}

interface MetaData {
  url: string
  name: string
  description: string
  logo: string
}

class SnsAggreator {
  private async request<T>(url: string) {
    const result = await fetch(`${BASE_URL}/${url}`)
    return result.json() as Promise<T>
  }

  async getSnsList(page: number): Promise<SNS[]> {
    return this.request(`v1/sns/list/page/${page}/slow.json`)
  }
}

export default SnsAggreator
