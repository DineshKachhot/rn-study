import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Animated, Easing, FlatList } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { RelativePathString, router } from "expo-router";

interface Reanimation {
    id: number;
    name: string;
    description: string;
    navigation: RelativePathString;
}

export default function Animations() {
    const [reanimations] = useState<Reanimation[]>([
        { id: 1, name: 'Animating Styles', description: 'Animating Styles', navigation: './animations/animating-styles' },
        { id: 2, name: 'Animated Props', description: 'Animated Props', navigation: './animations/animated-props' },
        { id: 3, name: 'Custom Animation', description: 'Custom Animation', navigation: './animations/custom-animation' },
        {id: 4, name: 'Modifiers', description: 'Modifiers', navigation: './animations/modifiers' },
        {id: 5, name: 'Gesture Handler', description: 'Gesture Handler', navigation: './animations/gesture-handler' },
    ]);

    const renderReanimation = (reanimation: Reanimation) => {
        return (
            <View className={styles.itemContainer} onTouchStart={() => router.push(reanimation.navigation)}>
                <View >
                    <Text className={styles.itemTitle}>{reanimation.name}</Text>
                    <Text className={styles.itemDescription}>{reanimation.description}</Text>
                </View>
                <Entypo name="chevron-right" size={24} color="black" />
            </View>
        );
    }

    return (
        <View>
            <FlatList
                data={reanimations}
                renderItem={({ item }: { item: Reanimation }) => renderReanimation(item)}
            />
        </View>
    );
}

const styles = {
    container: "flex flex-1 bg-white",
    itemContainer: "p-4 border-b border-gray-200 flex flex-row justify-between items-center",
    itemTitle: "text-lg font-bold",
    itemDescription: "text-gray-500",
}