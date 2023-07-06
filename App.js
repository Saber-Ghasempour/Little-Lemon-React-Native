import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable, Image, StyleSheet, View, Text, Button } from 'react-native';

import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/Splash';
import HomeScreen from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [isOnboardingCompleted, setOnboardingCompleted] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
        const name = await AsyncStorage.getItem("name");
        setOnboardingCompleted(name);
        setLoading(false);
        setName(name);
        setImage(await AsyncStorage.getItem("image"));
        setLastName(await AsyncStorage.getItem("lastName"));
    } catch (e) {
        console.log(e);
    }
  }

  const LogoTitle = () => {
      return (
          <Image
              style={{ height: 50 }}
              source={require("./assets/images/Logo.png")}
          />
      );
  };

  if (isLoading) {
    return <SplashScreen />
  }

  return (
      <NavigationContainer>
          <Stack.Navigator
              initialRouteName={ isOnboardingCompleted ? "Home" : "Onboarding" }
          >
              <Stack.Screen
                  name="Profile"
                  component={ProfileScreen}
                  options={({ navigation }) => ({
                      headerTitle: (props) => <LogoTitle {...props} />,
                      headerRight: () => (
                          <Pressable>
                              {image ? (
                                  <Image
                                      style={{ height: 50, width: 50 }}
                                      source={{ uri: image }}
                                  />
                              ) : (
                                  <Text>{`${name.charAt(0)} ${lastName.charAt(
                                      0
                                  )}`}</Text>
                              )}
                          </Pressable>
                      ),
                  })}
              />
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={({ navigation }) => ({
                      headerTitle: (props) => <LogoTitle {...props} />,
                      headerRight: () => (
                          <Pressable onPress={() => navigation.push("Profile")}>
                              {image ? (
                                  <Image
                                      style={{ height: 50, width: 50 }}
                                      source={{ uri: image }}
                                  />
                              ) : (
                                  <Text>{`${name.charAt(0)} ${lastName.charAt(
                                      0
                                  )}`}</Text>
                              )}
                          </Pressable>
                      ),
                  })}
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    imageEmpty: {
        borderRadius: 50,
    },
    imageEmptyText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
