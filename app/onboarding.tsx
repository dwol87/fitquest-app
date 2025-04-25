import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Animated } from "react-native";
import { StatusBar } from "expo-status-bar";

const onboardingData = [
  {
    title: "Welcome to FitQuest!",
    description: "Your fitness journey becomes a fun adventure!",
  },
  {
    title: "Earn XP & Level Up",
    description: "Complete workouts and healthy habits to gain points!",
  },
  {
    title: "Track Your Progress",
    description: "Stay consistent and visualize your success!",
  },
  {
    title: "Ready to Begin?",
    description: "Let’s get started and crush your goals!",
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const [currentPage, setCurrentPage] = useState(0);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (currentPage < onboardingData.length - 1) {
        setCurrentPage(currentPage + 1);
      } else {
        navigation.replace("Home");
        return;
      }

      // ✨ Instead of instantly jumping back to opacity 1,
      // ✨ Animate fade back in slowly
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>{onboardingData[currentPage].title}</Text>
      <Text style={styles.description}>
        {onboardingData[currentPage].description}
      </Text>
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentPage === onboardingData.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </Animated.View>
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
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: "#4CAF50",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});
