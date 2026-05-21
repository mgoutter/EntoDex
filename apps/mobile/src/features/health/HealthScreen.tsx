import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { HealthDto } from "@entodex/shared"
import { apiClient } from "../../shared/api/client"

export const HealthScreen = () => {
  const [health, setHealth] = useState<HealthDto | null>(null)
  const [state, setState] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    let active = true
    apiClient
      .getHealth()
      .then((value) => {
        if (!active) return
        setHealth(value)
        setState("ready")
      })
      .catch(() => {
        if (!active) return
        setState("error")
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>EntoDex Mobile</Text>
      <Text style={{ marginTop: 8 }}>API: {state === "ready" ? health?.status : state}</Text>
      <Text style={{ marginTop: 4 }}>At: {health?.timestamp ?? "-"}</Text>
    </View>
  )
}
