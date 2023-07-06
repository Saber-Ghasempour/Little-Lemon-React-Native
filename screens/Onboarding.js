import { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, TextInput, View, Image, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isValid, setValid] = useState(false);
    const emailValidation =
        /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

    useEffect(() => {
        setValid(/^[a-zA-Z]+$/.test(name) && emailValidation.test(email));
    }, [name, email]);

    const login = async () => {
        try {
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('email', email);
            navigation.replace("Profile");
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                style={styles.header}
                source={require("../assets/images/Logo.png")}
            />
            <Text style={styles.title}>Let us get to know you</Text>
            <Text style={styles.label}>First Name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={styles.textInput}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={styles.textInput}
            />
            <Pressable
                style={[
                    styles.button,
                    isValid
                        ? { backgroundColor: "#ccc" }
                        : { backgroundColor: "#eee" },
                ]}
                disabled={!isValid}
                onPress={login}
            >
                <Text style={styles.label}>Next</Text>
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 25
    },
    header: {
        marginBottom: 50
    },
    textInput: {
        borderColor: "#333",
        borderRadius: 10,
        borderStyle: "solid",
        width: "100%",
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 100
    },
    label: {
        fontSize: 20
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 20,
        alignSelf: "flex-end"
    }
});

export default OnboardingScreen;