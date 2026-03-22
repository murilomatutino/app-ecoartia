import colors from "@/constants/colors";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      {/* Logo e Título */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>⚖️</Text>
        <Text style={styles.title}>ECOARTIA</Text>
        <Text style={styles.subtitle}>
          Tecnologia a serviço da justiça ambiental
        </Text>
      </View>

      {/* Loading Spinner */}
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color={colors.darkGreen} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  logoIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.darkGreen,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: colors.darkGreen,
    opacity: 0.7,
  },
  spinnerContainer: {
    marginTop: 60,
  },
});
