import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = ({ navigation }) => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [notifications, setNotifications] = useState({
        orderStatus: true,
        passwordChanges: true,
        specialOffers: true,
        newsletter: true,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setImage(await AsyncStorage.getItem("image"));
        setName(await AsyncStorage.getItem("name"));
        setEmail(await AsyncStorage.getItem("email"));
        setLastName(await AsyncStorage.getItem("lastName"));
        setPhone(await AsyncStorage.getItem("phone"));
        const notif = await AsyncStorage.getItem("notifications");
        if (notif) setNotifications(JSON.parse(notif));
    };

    const saveChanges = async () => {
        await AsyncStorage.setItem("image", image)
        await AsyncStorage.setItem("name", name);
        await AsyncStorage.setItem("lastName", lastName);
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("phone", phone);
        await AsyncStorage.setItem("notifications", JSON.stringify(notifications));
        if (!navigation.canGoBack())
            navigation.replace("Home");
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const removeImage = () => {
        setImage("");
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Personal information</Text>
                <Text style={styles.label}>Avatar</Text>
                <View style={styles.row}>
                    {image ? (
                        <Image
                            style={styles.image}
                            source={{ uri: image }}
                        />
                    ) : (
                        <View style={styles.imageEmpty}>
                            <Text style={styles.imageEmptyText}>
                                {name &&
                                    Array.from(name)[0]}
                                {lastName &&
                                    Array.from(lastName)[0]}
                            </Text>
                        </View>
                    )}
                    <Pressable style={[styles.saveButton, { flex: 0.25 }]} onPress={pickImage}>
                        <Text style={styles.saveButtonText}>Change</Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.discardButton,
                            { flex: 0.25, marginLeft: 0 },
                        ]}
                        onPress={removeImage}
                    >
                        <Text style={styles.discardButtonText}>Remove</Text>
                    </Pressable>
                </View>
                <Text style={styles.label}>First name</Text>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Last name</Text>
                <TextInput
                    style={styles.textInput}
                    value={lastName}
                    onChangeText={setLastName}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.textInput}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Phone number</Text>
                <TextInput
                    style={styles.textInput}
                    value={phone}
                    onChangeText={setPhone}
                />
                <Text style={[styles.title, { marginTop: 10 }]}>
                    Email notifications
                </Text>
                <View style={styles.row}>
                    <Checkbox
                        style={styles.checkbox}
                        value={notifications.orderStatus ?? true}
                        onValueChange={(val) =>
                            setNotifications({
                                ...notifications,
                                orderStatus: val,
                            })
                        }
                    />
                    <Text style={styles.checkboxText}>Order statuses</Text>
                </View>
                <View style={styles.row}>
                    <Checkbox
                        style={styles.checkbox}
                        value={notifications.passwordChanges ?? true}
                        onValueChange={(val) =>
                            setNotifications({
                                ...notifications,
                                passwordChanges: val,
                            })
                        }
                    />
                    <Text style={styles.checkboxText}>Password changes</Text>
                </View>
                <View style={styles.row}>
                    <Checkbox
                        style={styles.checkbox}
                        value={notifications.specialOffers ?? true}
                        onValueChange={(val) =>
                            setNotifications({
                                ...notifications,
                                specialOffers: val,
                            })
                        }
                    />
                    <Text style={styles.checkboxText}>Special offers</Text>
                </View>
                <View style={styles.row}>
                    <Checkbox
                        style={styles.checkbox}
                        value={notifications.newsletter ?? true}
                        onValueChange={(val) =>
                            setNotifications({
                                ...notifications,
                                newsletter: val,
                            })
                        }
                    />
                    <Text style={styles.checkboxText}>Newsletter</Text>
                </View>
                <Pressable
                    style={styles.logoutButton}
                    onPress={() => {
                        AsyncStorage.clear();
                        navigation.replace("Onboarding");
                    }}
                >
                    <Text style={styles.logoutButtonText}>Log out</Text>
                </Pressable>
                <View style={[styles.row, { alignItems: "center" }]}>
                    <Pressable style={styles.discardButton} onPress={loadData}>
                        <Text style={styles.discardButtonText}>
                            Discard changes
                        </Text>
                    </Pressable>
                    <Pressable style={styles.saveButton} onPress={saveChanges}>
                        <Text style={styles.saveButtonText}>Save changes</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 25,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    label: {
        color: "#999",
        fontSize: 11,
        marginTop: 20,
    },
    row: {
        flexDirection: "row",
        marginTop: 10,
    },
    image: {
        flex: 0.33,
        resizeMode: "contain",
        maxHeight: 100,
    },
    imageEmpty: {
        flex: 0.45,
        borderRadius: 50,
        backgroundColor: "#0b9a6a",
        alignItems: "center",
        justifyContent: "center",
    },
    imageEmptyText: {
        fontSize: 20,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    textInput: {
        borderColor: "#aaa",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 3,
        margin: 5,
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxText: {
        fontSize: 12,
    },
    logoutButton: {
        backgroundColor: "#F4CE14",
        marginTop: 20,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
    },
    logoutButtonText: {
        fontWeight: "bold",
    },
    discardButton: {
        borderColor: "#495E57",
        margin: 30,
        alignItems: "center",
        height: 40,
        padding: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
    },
    discardButtonText: {
        color: "#495E57",
    },
    saveButton: {
        backgroundColor: "#495E57",
        margin: 30,
        alignItems: "center",
        height: 40,
        padding: 10,
        borderRadius: 10,
    },
    saveButtonText: {
        color: "white",
    },
});

export default ProfileScreen;