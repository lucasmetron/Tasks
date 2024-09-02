import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import * as SplashScreen from "expo-splash-screen";
import TaskList from "./src/screens/TaskList";

// Impede que a tela de splash desapareça automaticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold });

  // Função para esconder a tela de splash
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // Esconde a tela de splash
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Retorna nulo até que as fontes sejam carregadas
  }
  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <TaskList />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
  },
});
