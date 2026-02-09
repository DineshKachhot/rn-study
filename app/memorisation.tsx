import { Container } from "@/components/Container";
import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function Memorisation() {
    return (
        <View className={styles.container}>
            <Stack.Screen options={{ title: 'Memorisation' }} />
            <Container>
                <Text className={styles.title}>Memorisation</Text>
            </Container>
        </View>
    );
}

const styles = {
    container: "flex flex-1 bg-white",
    title: "text-lg font-bold",
}