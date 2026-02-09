import { View, Text, Button } from "react-native";
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);


export default function AnimatedProps() {
    const r = useSharedValue(20);
    const handlePress = () => {
        r.value += 10;
    };

    const animatedProps = useAnimatedProps(() => {
        return {
            r: withTiming(r.value, { duration: 1000 }),
        };
    });
    return (
        <View className="flex-1 bg-white">
            <Text>Animated Props</Text>
            <Svg width="100%" height="50%">
                <AnimatedCircle cx="50%" cy="50%" r={r.value} fill="red" animatedProps={animatedProps} />
            </Svg>
            <Button title="Press me" onPress={handlePress} />
        </View>
    );
}