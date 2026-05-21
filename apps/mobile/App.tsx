import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native"
import { HealthScreen } from "./src/features/health/HealthScreen"

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <HealthScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}
