import { HealthDto, nowIso } from "@entodex/shared"

export const getHealthRepository = (): HealthDto => {
  return { status: "ok", timestamp: nowIso() }
}
