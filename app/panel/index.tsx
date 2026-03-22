import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface RankingItem {
  position: number;
  name: string;
  score: number;
}

interface Mission {
  id: number;
  icon: string;
  title: string;
  completed: boolean;
}

const rankingData: RankingItem[] = [
  { position: 1, name: "Murilo", score: 550.0 },
  { position: 2, name: "João", score: 440.0 },
  { position: 3, name: "Carlos", score: 420.0 },
  { position: 10, name: "Eu", score: 233.4 },
];

const missionsData: Mission[] = [
  { id: 1, icon: "🥤", title: "Garrafa pet", completed: false },
  { id: 2, icon: "🛢️", title: "Óleo", completed: false },
  { id: 3, icon: "🔌", title: "Cabo de vassoura", completed: false },
  { id: 4, icon: "☕", title: "Borra de café", completed: false },
];

export default function Home() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMissionPress = (mission: Mission) => {
    Alert.alert(`Missão: ${mission.title}`, "Deseja participar desta missão?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Participar",
        onPress: () => console.log("Participando:", mission.title),
      },
    ]);
  };

  const handleLogout = () => {
    setMenuVisible(false);
    router.replace("/");
  };

  const handleProfile = () => {
    setMenuVisible(false);
    router.push({ pathname: "/panel/profile" } as any);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>⚖️</Text>
          <Text style={styles.headerTitle}>ECOARTIA</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Overlay - Fecha o menu ao tocar fora */}
      {menuVisible && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        />
      )}

      {/* Drawer Menu */}
      <View
        style={[styles.drawer, menuVisible ? styles.drawerOpen : styles.drawerClosed]}
        pointerEvents={menuVisible ? "auto" : "none"}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setMenuVisible(false)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.drawerContent}>
          <TouchableOpacity style={styles.drawerItem} onPress={handleProfile}>
            <Text style={styles.drawerItemIcon}>👤</Text>
            <Text style={styles.drawerItemText}>Perfil</Text>
          </TouchableOpacity>

          <View style={styles.drawerDivider} />

          <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
            <Text style={styles.drawerItemIcon}>🚪</Text>
            <Text style={styles.drawerItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Balance and Badge */}
      <View style={styles.balanceContainer}>
        <View style={styles.balanceCard}>
          <Text style={styles.currencyIcon}>💰</Text>
          <Text style={styles.balanceText}>550,00</Text>
        </View>
        <View style={styles.badgeCard}>
          <Text style={styles.badgeIcon}>⭐</Text>
          <Text style={styles.badgeText}>IFBASEA</Text>
        </View>
      </View>

      {/* Scroll Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Ranking Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ranking</Text>
          <View style={styles.rankingContainer}>
            {rankingData.map((item) => (
              <View key={item.position} style={styles.rankingItem}>
                <View style={styles.rankingPosition}>
                  <Text style={styles.positionNumber}>{item.position}º</Text>
                  <Text style={styles.rankingName}>{item.name}</Text>
                </View>
                <Text style={styles.rankingScore}>{item.score.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Missions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Missões</Text>
          <View style={styles.missionsContainer}>
            {missionsData.map((mission) => (
              <TouchableOpacity
                key={mission.id}
                style={styles.missionCard}
                onPress={() => handleMissionPress(mission)}
              >
                <View style={styles.missionContent}>
                  <Text style={styles.missionIcon}>{mission.icon}</Text>
                  <Text style={styles.missionTitle}>{mission.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGreen,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    fontSize: 28,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.darkGreen,
  },
  menuIcon: {
    fontSize: 24,
    color: colors.darkGreen,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    zIndex: 99,
  },
  drawer: {
    position: "absolute",
    top: 0,
    right: -250,
    width: 250,
    height: "100%",
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingHorizontal: 15,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  drawerClosed: {
    right: -250,
  },
  drawerOpen: {
    right: 0,
  },
  closeButton: {
    alignSelf: "flex-start",
    padding: 12,
    marginBottom: 20,
    minWidth: 50,
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 28,
    color: colors.darkGreen,
    fontWeight: "bold",
  },
  drawerContent: {
    gap: 0,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 15,
    gap: 15,
  },
  drawerItemIcon: {
    fontSize: 24,
  },
  drawerItemText: {
    fontSize: 16,
    color: colors.darkGreen,
    fontWeight: "500",
  },
  drawerDivider: {
    height: 1,
    backgroundColor: colors.gray,
    marginVertical: 8,
  },
  balanceContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 15,
  },
  balanceCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 10,
  },
  currencyIcon: {
    fontSize: 24,
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.darkGreen,
  },
  badgeCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 10,
  },
  badgeIcon: {
    fontSize: 24,
  },
  badgeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.darkGreen,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.darkGreen,
    marginBottom: 12,
  },
  rankingContainer: {
    backgroundColor: colors.lightBeige,
    borderRadius: 12,
    overflow: "hidden",
  },
  rankingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.beige,
  },
  rankingPosition: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  positionNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.darkGreen,
    minWidth: 30,
  },
  rankingName: {
    fontSize: 14,
    color: colors.darkGreen,
  },
  rankingScore: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.darkGreen,
  },
  missionsContainer: {
    gap: 12,
  },
  missionCard: {
    backgroundColor: colors.buttonOrange,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  missionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  missionIcon: {
    fontSize: 28,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkGreen,
  },
});
