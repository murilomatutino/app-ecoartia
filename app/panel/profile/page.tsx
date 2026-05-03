import colors from "@/constants/colors";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Erro ao obter usuário:", userError);
        setLoading(false);
        return;
      }

      setEmail(user.email);

      const { data, error } = await supabase
        .from("membro_comvida")
        .select("nome")
        .eq("id_membro", user.id)
        .single();

      if (error) {
        console.error("Erro ao buscar nome do usuário:", error);
      } else if (data) {
        setName(data.nome);
      }

      setLoading(false);
    }

    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Meu Dados</Text>
        {loading ? (
          <Text style={styles.infoText}>Carregando...</Text>
        ) : (
          <>
            <View style={styles.field}>
              <Text style={styles.label}>Nome</Text>
              <Text style={styles.value}>{name ?? "Não disponível"}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{email ?? "Não disponível"}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGreen,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B4332",
    marginBottom: 20,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: "#6A8A76",
    marginBottom: 6,
  },
  value: {
    fontSize: 18,
    color: "#0F3D21",
    fontWeight: "600",
  },
  infoText: {
    fontSize: 16,
    color: "#0F3D21",
  },
});
