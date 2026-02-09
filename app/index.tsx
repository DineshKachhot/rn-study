import { Stack, Link, RelativePathString } from 'expo-router';

import { FlatList, View, Text, Pressable } from 'react-native';


import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';
import { useEffect, useState } from 'react';

interface Demo {
  id: number;
  name: string;
  description: string;
  path: RelativePathString;
}

export default function Home() {
  const [demos, setDemos] = useState<Demo[]>([]);
  useEffect(() => {
    setDemos([
      { id: 1, name: 'Animations', description: 'Animations using Animations API, Reanimated., ', path: './animations' },
      { id: 2, name: 'Memorisations', description: 'Memorisations using memo, useMemo, useCallback', path: './memorisation' },
      { id: 3, name: 'Worklets', description: 'Worklets using Worklets API', path: './worklets' },
    ]);
  }, []);
  return (
    
      <View className={styles.container}>
    
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <FlatList
          data={demos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={item.path} asChild>
              <Pressable className={styles.demoItem}>
                <Text className={styles.demoItemName}>{item.name}</Text>
                <Text className={styles.demoItemDescription}>{item.description}</Text>
              </Pressable>
            </Link>
          )}
        />
      </Container>
    </View>
  );
}


const styles = {
  container: "flex flex-1 bg-white",
  demoItem: "p-4 border-b border-gray-200",
  demoItemName: "text-lg font-bold",
  demoItemDescription: "text-gray-500",
}

