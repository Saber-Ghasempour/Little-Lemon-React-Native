import { StyleSheet, Image, View } from "react-native"


const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../assets/images/Logo.png")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        height: 100,
        width: "90%",
        resizeMode: "contain",
    },
});

export default SplashScreen;