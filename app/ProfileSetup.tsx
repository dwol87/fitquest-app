import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function ProfileSetupScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const avatars = [
    "https://api.dicebear.com/7.x/adventurer/png?seed=FitQuest1",
    "https://api.dicebear.com/7.x/adventurer/png?seed=FitQuest2",
    "https://api.dicebear.com/7.x/adventurer/png?seed=FitQuest3",
  ];

  const fitnessGoals = ["Lose Weight", "Build Muscle", "Stay Healthy"];

  const handleContinue = async () => {
    if (username.trim() === "") {
      alert("Please enter a username.");
      return;
    }
    if (!selectedAvatar) {
      alert("Please select an avatar.");
      return;
    }
    if (!selectedGoal) {
      alert("Please select a fitness goal.");
      return;
    }

    // Save the user profile
    const userProfile = {
      username,
      avatar: selectedAvatar,
      goal: selectedGoal,
      xp: 0,
    };

    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(userProfile));
      navigation.replace("Home");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Something went wrong saving your profile. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>
      <View style={styles.avatarContainer}>
        {avatars.map((avatarUrl, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedAvatar(avatarUrl)}
          >
            <Image
              source={{ uri: avatarUrl }}
              style={[
                styles.avatar,
                selectedAvatar === avatarUrl && styles.selectedAvatar,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <View style={styles.goalContainer}>
        {fitnessGoals.map((goal, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedGoal(goal)}
            style={[
              styles.goalButton,
              selectedGoal === goal && styles.selectedGoalButton,
            ]}
          >
            <Text
              style={[
                styles.goalButtonText,
                selectedGoal === goal && styles.selectedGoalButtonText,
              ]}
            >
              {goal}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "80%",
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
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
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedAvatar: {
    borderColor: "#4CAF50",
    borderWidth: 3,
  },
  goalContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  goalButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  selectedGoalButton: {
    backgroundColor: "#4CAF50",
  },
  goalButtonText: {
    fontSize: 16,
    color: "#333",
  },
  selectedGoalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
