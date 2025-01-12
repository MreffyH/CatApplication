import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function GLBBPage() {
  const [acceleration, setAcceleration] = useState('');
  const [initialVelocity, setInitialVelocity] = useState('');
  const [time, setTime] = useState('');
  const [finalVelocity, setFinalVelocity] = useState('');
  const [distance, setDistance] = useState('');

  const calculate = () => {
    const a = parseFloat(acceleration) || 0;
    const v0 = parseFloat(initialVelocity) || 0;
    const t = parseFloat(time) || 0;

    const v = v0 + a * t;
    const s = v0 * t + 0.5 * a * t * t;

    setFinalVelocity(v.toFixed(2));
    setDistance(s.toFixed(2));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('./assets/1-logo.png')} style={styles.logo} />
        <Text style={styles.tagline}>"Make Physics More Fun"</Text>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Image source={require('./assets/7-GLBBgambar.png')} style={styles.heroImage} />
        <Text style={styles.heroText}>
          Gerak Lurus Berubah Beraturan (GLBB) adalah gerak dengan lintasan lurus di mana
          percepatan selalu tetap.
        </Text>
      </View>

      {/* Simulasi */}
      <View style={styles.simulation}>
        <Text style={styles.simulationTitle}>Simulasi GLBB</Text>

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Percepatan (m/s²)"
          keyboardType="numeric"
          value={acceleration}
          onChangeText={setAcceleration}
        />
        <TextInput
          style={styles.input}
          placeholder="Kecepatan Awal (m/s)"
          keyboardType="numeric"
          value={initialVelocity}
          onChangeText={setInitialVelocity}
        />
        <TextInput
          style={styles.input}
          placeholder="Waktu (s)"
          keyboardType="numeric"
          value={time}
          onChangeText={setTime}
        />

        {/* Calculate Button */}
        <TouchableOpacity style={styles.button} onPress={calculate}>
          <Text style={styles.buttonText}>Hitung</Text>
        </TouchableOpacity>

        {/* Results */}
        <View style={styles.results}>
          <Text>Kecepatan Akhir: {finalVelocity} m/s</Text>
          <Text>Jarak Tempuh: {distance} m</Text>
        </View>
      </View>

      {/* CTA Section */}
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaText}>Ayo Latihan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  logo: { width: 40, height: 40, marginRight: 10 },
  tagline: { fontSize: 18, fontWeight: 'bold' },
  hero: { alignItems: 'center', marginBottom: 20 },
  heroImage: { width: '100%', height: 200, resizeMode: 'contain' },
  heroText: { fontSize: 16, textAlign: 'center', marginTop: 10 },
  simulation: { backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 3 },
  simulationTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: { backgroundColor: '#68E6B1', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
  results: { marginTop: 20 },
  ctaButton: {
    marginTop: 20,
    backgroundColor: '#A3FDE2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  ctaText: { fontSize: 16, fontWeight: 'bold' },
});
