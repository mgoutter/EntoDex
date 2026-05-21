import { Server as SocketIOServer } from "socket.io"
import { HealthDto, nowIso } from "@entodex/shared"

export const initSocket = (server: any): SocketIOServer => {
  const io = new SocketIOServer(server, {
    path: "/api/socket",
    cors: {
      origin: "*"
    }
  })

  io.on("connection", (socket) => {
    const payload: HealthDto = { status: "ok", timestamp: nowIso() }
    socket.emit("ready", payload)
  })

  return io
}
