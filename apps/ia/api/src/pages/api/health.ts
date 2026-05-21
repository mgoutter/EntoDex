import type { NextApiRequest, NextApiResponse } from "next"
import { getHealthController } from "../../modules/health/controller"

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const data = getHealthController()
  res.status(200).json(data)
}

export default handler
