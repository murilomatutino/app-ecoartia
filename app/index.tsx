import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    router.push("/panel");

    /*if (login.trim() && senha.trim()) {
      console.log("Login:", login, "Senha:", senha);
      router.push("/panel");
    } else {
      console.log("Preencha todos os campos");
    }*/
  };

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

      {/* Formulário */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Login"
          placeholderTextColor="#999"
          value={login}
          onChangeText={setLogin}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
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
    marginBottom: 50,
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
  formContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    color: colors.darkGreen,
  },
  button: {
    backgroundColor: colors.buttonOrange,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
