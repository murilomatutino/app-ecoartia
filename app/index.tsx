import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: login,
      password: senha,
    });

    if (error) {
      Alert.alert("Erro", "Erro: " + error.message);
      console.log(error.message);
      return;
    }

    router.push("/panel");
  }

  function cadastro() {
    router.push("/cadastro");
  }

  return (
    <View style={styles.container}>
      {/* Logo e Título */}
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoIcon}
          source={require("../assets/images/logo.png")}
        />
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

        <TouchableOpacity style={styles.button_cadastro} onPress={cadastro}>
          <Text style={styles.buttonText_cadastro}>Cadastrar</Text>
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
    width: 320,
    height: 320,
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
  button_cadastro: {
    alignItems: "center",
    marginTop: 20,
  },
  buttonText_cadastro: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
