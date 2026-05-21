import { HealthDto } from "@entodex/shared"

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:3001"

export const apiClient = {
  async getHealth(): Promise<HealthDto> {
    const res = await fetch(`${BASE_URL}/api/health`)
    if (!res.ok) {
      return { status: "error", timestamp: new Date(0).toISOString() }
    }
    const data = (await res.json()) as Partial<HealthDto>
    return {
      status: data.status ?? "ok",
      timestamp: data.timestamp ?? new Date(0).toISOString()
    }
  }
}
