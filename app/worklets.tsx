// WorkletsBlogScreen.tsx
// Blog-style tutorial using react-native-worklets

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { worklets } from 'react-native-worklets'; // <-- updated dependency[web:2][web:5]

/* -------------------------------------------------------------------------- */
/*  SECTION 1 – Basic worklet                                                 */
/* -------------------------------------------------------------------------- */

const randomNumberWorklet = (): number => {
  'worklet';
  return Math.random();
};

/* -------------------------------------------------------------------------- */
/*  SECTION 2 – Closures demo                                                 */
/* -------------------------------------------------------------------------- */

const closureBase = 10;
let closureCounter = 0;

const closureDemoWorklet = () => {
  'worklet';
  return {
    base: closureBase,
    counter: closureCounter,
  };
};

/* -------------------------------------------------------------------------- */
/*  SECTION 3 – Fibonacci                                                     */
/* -------------------------------------------------------------------------- */

const fibonacciWorklet = (num: number): number => {
  'worklet';

  if (num <= 1) return num;

  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= num; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
};

export const WorkletsBlogScreen: React.FC = () => {
  const [randomResult, setRandomResult] = useState<string | null>(null);
  const [isRandomRunning, setIsRandomRunning] = useState(false);

  const [closureSnapshot, setClosureSnapshot] = useState<string | null>(null);
  const [isClosureRunning, setIsClosureRunning] = useState(false);

  const [fibInput, setFibInput] = useState('30');
  const [fibResult, setFibResult] = useState<string | null>(null);
  const [isFibRunning, setIsFibRunning] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // You can use the default worklet context exposed by react-native-worklets.
  // Adjust this line if your version uses a slightly different API name.[web:2]
  const defaultContext = worklets.defaultContext;

  /* --------------------------- random worklet --------------------------- */

  const runRandomWorklet = useCallback(async () => {
    setError(null);
    setRandomResult(null);
    setIsRandomRunning(true);

    try {
      const result = await defaultContext.runAsync(() => {
        'worklet';
        return randomNumberWorklet();
      });

      setRandomResult(result.toFixed(5));
    } catch (e: any) {
      setError(e?.message ?? 'Failed to run random worklet.');
    } finally {
      setIsRandomRunning(false);
    }
  }, [defaultContext]);

  /* -------------------------- closure demo ------------------------------ */

  const runClosureDemo = useCallback(async () => {
    setError(null);
    setClosureSnapshot(null);
    setIsClosureRunning(true);

    closureCounter += 1;

    try {
      const snapshot = await defaultContext.runAsync(() => {
        'worklet';
        return closureDemoWorklet();
      });

      setClosureSnapshot(
        `base = ${snapshot.base}, counter (captured) = ${snapshot.counter}`,
      );
    } catch (e: any) {
      setError(e?.message ?? 'Failed to run closure demo worklet.');
    } finally {
      setIsClosureRunning(false);
    }
  }, [defaultContext]);

  /* --------------------------- fibonacci -------------------------------- */

  const runFibonacci = useCallback(async () => {
    setError(null);
    setFibResult(null);

    const n = Number(fibInput);
    if (Number.isNaN(n) || n < 0 || n > 80) {
      setError('Please enter a number between 0 and 80.');
      return;
    }

    setIsFibRunning(true);

    try {
      const result = await defaultContext.runAsync(() => {
        'worklet';
        return fibonacciWorklet(n);
      });

      setFibResult(String(result));
    } catch (e: any) {
      setError(e?.message ?? 'Failed to run Fibonacci worklet.');
    } finally {
      setIsFibRunning(false);
    }
  }, [fibInput, defaultContext]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>React Native Worklets – Blog Tutorial</Text>

      <Text style={styles.paragraph}>
        React Native Worklets is a multithreading engine that lets you run JavaScript on multiple
        runtimes, such as the UI runtime or background runtimes, while keeping your UI smooth.[web:2][web:5]
      </Text>

      <Text style={styles.sectionTitle}>1. Basic worklet example</Text>
      <Text style={styles.paragraph}>
        A worklet is just a function with the
        {' '}<Text style={styles.codeInline}>&apos;worklet&apos;</Text> directive. Here we run a
        small worklet that returns a random number on a background context.[web:2]
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Runnable example: random number</Text>

        <Pressable
          style={[styles.button, isRandomRunning && styles.buttonDisabled]}
          onPress={runRandomWorklet}
          disabled={isRandomRunning}
        >
          {isRandomRunning ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Run random worklet</Text>
          )}
        </Pressable>

        {randomResult != null && (
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Random value (from worklet):</Text>
            <Text style={styles.resultValue}>{randomResult}</Text>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>2. Closures in worklets</Text>
      <Text style={styles.paragraph}>
        Worklets can capture values from their surrounding scope. In React Native Worklets, closures
        are copied when running on another runtime, not shared by reference.[web:16]
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Runnable example: closure snapshot</Text>

        <Pressable
          style={[styles.button, isClosureRunning && styles.buttonDisabled]}
          onPress={runClosureDemo}
          disabled={isClosureRunning}
        >
          {isClosureRunning ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Run closure demo</Text>
          )}
        </Pressable>

        {closureSnapshot != null && (
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Captured closure:</Text>
            <Text style={styles.resultValue}>{closureSnapshot}</Text>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>3. Background Fibonacci</Text>
      <Text style={styles.paragraph}>
        This example offloads a CPU‑heavy Fibonacci calculation to a worklet context. The main JS
        thread stays responsive while the worklet runs.[web:2][web:21]
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>n (0–80):</Text>
        <TextInput
          style={styles.input}
          value={fibInput}
          onChangeText={setFibInput}
          keyboardType="number-pad"
          placeholder="e.g. 35"
        />

        <Pressable
          style={[styles.button, isFibRunning && styles.buttonDisabled]}
          onPress={runFibonacci}
          disabled={isFibRunning}
        >
          {isFibRunning ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Run Fibonacci worklet</Text>
          )}
        </Pressable>

        {fibResult != null && (
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Fibonacci result:</Text>
            <Text style={styles.resultValue}>{fibResult}</Text>
          </View>
        )}
      </View>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  content: { padding: 16, paddingBottom: 32 },
  heading: { fontSize: 24, fontWeight: '600', color: '#e5e7eb', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#e5e7eb', marginTop: 20, marginBottom: 6 },
  paragraph: { fontSize: 14, color: '#9ca3af', lineHeight: 20, marginBottom: 6 },
  codeInline: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }) ?? 'monospace',
    color: '#f97316',
  },
  card: { backgroundColor: '#0b1120', borderRadius: 12, padding: 12, marginTop: 8 },
  cardTitle: { fontSize: 15, fontWeight: '500', color: '#e5e7eb', marginBottom: 6 },
  label: { fontSize: 14, color: '#d1d5db', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#e5e7eb',
    fontSize: 14,
    marginBottom: 10,
  },
  button: { backgroundColor: '#2563eb', borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginTop: 4 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#f9fafb', fontSize: 14, fontWeight: '500' },
  resultBox: { marginTop: 10, padding: 10, borderRadius: 8, backgroundColor: '#020617' },
  resultLabel: { fontSize: 12, color: '#9ca3af' },
  resultValue: { fontSize: 16, color: '#a5b4fc', marginTop: 4 },
  errorBox: { marginTop: 16, padding: 10, borderRadius: 8, backgroundColor: '#7f1d1d' },
  errorText: { color: '#fee2e2', fontSize: 13 },
});

export default WorkletsBlogScreen;
