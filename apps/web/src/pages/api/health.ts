import type { NextApiRequest, NextApiResponse } from "next"
import { getHealthController } from "../../modules/health/controller"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
    res.status(204).end()
    return
  }

  try {
    const data = getHealthController()
    res.status(200).json(data)
  } catch {
    res.status(500).json({ status: "error" })
  }
}

export default handler
