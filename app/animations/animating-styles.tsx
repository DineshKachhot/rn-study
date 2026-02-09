import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import Animated, { withTiming } from "react-native-reanimated";
import { StyleSheet } from "react-native";

export default function AnimatingStyles() {
    const translateX = useSharedValue(0);
    
    const handlePress = () => {
        translateX.value += 50;
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withTiming(translateX.value * 2, { duration: 1000 }) }],
        };
    });

    return (
        <View className="flex-1 bg-white">
            <Text>Animating Styles</Text>
            <Animated.View style={[styles.box, animatedStyle]} />
            <Button title="Press me" onPress={handlePress} />
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
    },
});