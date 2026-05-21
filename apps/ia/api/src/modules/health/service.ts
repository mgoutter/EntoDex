import { HealthDto } from "@entodex/shared"
import { getHealthRepository } from "./repository"

export const getHealthService = (): HealthDto => {
  return getHealthRepository()
}
