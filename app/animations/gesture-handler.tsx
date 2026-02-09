import { AntDesign } from "@expo/vector-icons";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function GestureHandler() {
    const pressed = useSharedValue<boolean>(false);
    const started = useSharedValue<boolean>(false);
    const offset = useSharedValue<number>(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: pressed.value ? 'blue' : 'red',
            transform: [{ scale: withTiming(pressed.value ? 1.2 : 1, { duration: 100 }) }],
        };
    });

    const tap = Gesture.Tap()
    .onBegin(() => {
        pressed.value = true;
    })
    .onFinalize(() => {
        pressed.value = false;
    });

    const pan = Gesture.Pan()
    .onBegin(() => {
        // started.value = true;
    })
    .onUpdate((event) => {
        offset.value = event.translationX;
    })
    .onFinalize(() => {
        if (offset.value > 300) {
            started.value = true;
        } else {
            started.value = false;
        }

        if (started.value !== true) {
            offset.value = 0;
        }
        
    });

    const sliderStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withTiming(offset.value, { duration: 100 }) }],
        };
    });

    return (
        <View className="flex-1 bg-white justify-center items-center">
            <Text style={styles.title}>Tap the circle</Text>
            <GestureDetector gesture={tap}>
                <Animated.View style={[animatedStyle, styles.circle]} />
            </GestureDetector>
            <Animated.View style={[styles.slideToStart, { opacity: started.value ? 1 : 0.5 }]}>
            <GestureDetector gesture={pan}>

                    <Animated.View style={[sliderStyle, styles.slideToStartButton]}>
                    <AntDesign name="double-right" size={24} color="black" />
                    
                    </Animated.View>
                    </GestureDetector>

                </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    },
    circle: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: 50,
    },
    slideToStart: {
        minWidth: '100%',
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
    },
    slideToStartButton: {
        width: '50%',
        backgroundColor: '#2563eb',
        borderRadius: 10,
        padding: 10,
        margin: 5,
    },
});