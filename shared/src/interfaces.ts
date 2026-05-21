import { HealthDto } from "./dto"

export interface HealthRepository {
  getStatus(): HealthDto
}

export interface HealthService {
  getStatus(): HealthDto
}