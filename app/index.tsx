import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingScreen from "./onboarding";
import ProfileSetupScreen from "./ProfileSetup";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
  const [userProfile, setUserProfile] = useState<any>(null);

  const getLevelFromXP = (xp: number) => {
    return Math.floor(xp / 100) + 1; // Example: 0-99 XP = Level 1, 100-199 XP = Level 2, etc.
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem("userProfile");
        if (storedProfile) {
          setUserProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      {userProfile ? (
        <>
          <Text style={styles.title}>Welcome, {userProfile.username}!</Text>
          <Image
            source={{ uri: userProfile.avatar }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 20,
            }}
          />
          <Text style={styles.description}>Your Goal: {userProfile.goal}</Text>
          <Text style={styles.levelText}>
            Level {getLevelFromXP(userProfile.xp)}
          </Text>

          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${userProfile.xp % 100}%` },
              ]}
            />
          </View>

          <Text style={styles.xpText}>{userProfile.xp} XP</Text>
        </>
      ) : (
        <Text style={styles.title}>Loading your profile...</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileSetup"
        component={ProfileSetupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Welcome" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  levelText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
  progressBarBackground: {
    width: "80%",
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  xpText: {
    marginTop: 5,
    fontSize: 16,
    color: "#333",
  },
});
