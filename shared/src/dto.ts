import { ApiStatus } from "./types"

export interface HealthDto {
  status: ApiStatus
  timestamp: string
}
