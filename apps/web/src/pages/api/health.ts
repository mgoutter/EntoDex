import type { NextApiRequest, NextApiResponse } from "next"
import { getHealthController } from "../../modules/health/controller"
import { applyCorsHeaders } from "@entodex/shared"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  applyCorsHeaders(req, res)

  if (req.method === "OPTIONS") {
    res.status(204).end()
    return
  }

  try {
    const data = getHealthController()
    return res.status(200).json(data)
  } catch {
    res.status(500).json({ status: "error" })
  }
}

export default handler
