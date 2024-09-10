import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <GestureHandlerRootView>
          <TaskList />
          <StatusBar style="dark" />
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
