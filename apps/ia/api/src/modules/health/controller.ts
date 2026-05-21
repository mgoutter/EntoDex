import { HealthDto } from "@entodex/shared"
import { getHealthService } from "./service"

export const getHealthController = (): HealthDto => {
  return getHealthService()
}
