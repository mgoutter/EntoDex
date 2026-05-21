import type { NextApiRequest, NextApiResponse } from "next"
import { Server as SocketIOServer } from "socket.io"
import { initSocket } from "../../modules/realtime/socket"

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: {
      io?: SocketIOServer
    }
  }
}

const handler = (_req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    res.socket.server.io = initSocket(res.socket.server)
  }
  res.status(200).end()
}

export default handler
