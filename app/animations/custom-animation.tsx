import { useEffect } from "react";
import { Button, View, Text, StyleSheet, Dimensions } from "react-native";
import Animated ,{ Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

const duration = 2000;

export default function CustomAnimation() {

    const height = Dimensions.get('window').height;

    const defaultAnim = useSharedValue<number>(height / 2 - 160);
    const linearAnim = useSharedValue<number>(height / 2 - 160);

    const animatedDefaultStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: defaultAnim.value }],
        };
    });

    const animatedLinearStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: linearAnim.value }],
        };
    });

    useEffect(() => {
        defaultAnim.value = withRepeat(withTiming(-defaultAnim.value, { duration, easing: Easing.linear }), -1, true);
        linearAnim.value = withRepeat(withTiming(-linearAnim.value, { duration }), -1, true);
    }, [defaultAnim, linearAnim]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, animatedDefaultStyle]} >
                <Text style={styles.text}>Default</Text>
            </Animated.View>
            <Animated.View style={[styles.box, animatedLinearStyle]} >
                <Text style={styles.text}>Linear</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    box: {
        width: 80,
        height: 80,
        margin: 20,
        borderWidth: 1,
        backgroundColor: 'red',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});