import colors from "@/constants/colors";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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

interface Comvida {
  id_comvida: number;
  nome: string;
}

export default function Cadastro() {
  const [login, setLogin] = useState("");
  const [nome, setNome] = useState("");
  const [comvida, setComvida] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();
  const [show, setShow] = useState(false);

  const [comvidas, setComvidas] = useState<Comvida[]>([]);

  useEffect(() => {
    fetchComvidas();
  }, []);

  async function fetchComvidas() {
    const { data, error } = await supabase.from("comvida").select("*");

    if (error) {
      console.error("Erro ao buscar comvidas:", error);
    } else {
      setComvidas(data);
    }
  }

  async function handleCadastro() {
    if (!(login && nome && comvida && senha)) {
      setShow(true);
      return;
    }

    const { error, data } = await supabase.auth.signUp({
      email: login,
      password: senha,
    });

    if (error) Alert.alert(error.message);
    if (!data) Alert.alert("Email de verificação enviado");

    // await supabase.auth.getSession();
    if (data?.user?.id) {
      const user_id = data.user.id;

      const { data: insertData, error: insertError } = await supabase
        .from("membro_comvida")
        .insert({
          id_membro: user_id,
          nome: nome,
          email: login,
          id_comvida: parseInt(comvida),
        });
    }

    if (error) {
      console.error(error.code + " " + error.message);
      Alert.alert("Erro", error.code + " " + error.message);
      return "error";
    } else {
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      router.replace("/");
      return "success";
    }
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
          placeholder="Nome completo"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />

        <Picker
          style={styles.input}
          selectedValue={comvida}
          onValueChange={(value) => setComvida(value as string)}
        >
          <Picker.Item label="Selecione uma Comvida" value="" />
          {comvidas.map((item) => (
            <Picker.Item
              key={item.id_comvida}
              label={item.nome}
              value={item.id_comvida.toString()}
            />
          ))}
        </Picker>

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

        {show && <Text style={styles.aviso}>Há campos vazios!</Text>}

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
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
  aviso: {
    color: colors.buttonOrange,
  },
});
