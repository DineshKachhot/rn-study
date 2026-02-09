import { View, Text, Button, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";

export default function Modifiers() {
    const offset = useSharedValue<number>(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: offset.value }],
        };
    });

    const OFFSET_VALUE: number = 60;
    const DURATION: number = 250;
    const DELAY: number = 200;

    const handlePress = () => {
        offset.value = withDelay(DELAY, withSequence( 
            withTiming(-OFFSET_VALUE, { duration: DURATION / 2 }), 
            withRepeat(withTiming(OFFSET_VALUE, { duration: DURATION }), 6, true), 
            withTiming(0, { duration: DURATION / 2 })
        ));
        withSequence( 
            withTiming(-OFFSET_VALUE, { duration: DURATION / 2 }), 
            withRepeat(withTiming(OFFSET_VALUE, { duration: DURATION }), 6, true), 
            withTiming(0, { duration: DURATION / 2 })
        );
    };

    return (
        <View style={styles.container}>
            <Text>Modifiers</Text>
            <Animated.View style={[styles.box, animatedStyle]} />
            <Button title="Press me" onPress={handlePress} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: 'purple',
    },
});