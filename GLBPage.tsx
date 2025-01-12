import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function GLBPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/1-logo.png')} style={styles.logo} />
        <Text style={styles.title}>"Make Physics More Fun"</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Gerak lurus beraturan (GLB) adalah gerak sepanjang lintasan lurus dengan kecepatan tetap, di mana kecepatan benda tidak berubah baik dalam besar maupun arah...
        </Text>
        <Text style={styles.formula}>Rumus: V = S / T</Text>
      </View>

      <View style={styles.gameSection}>
        <Text style={styles.gameTitle}>Coba Permainan Berikut!</Text>
        {/* Tambahkan elemen interaktif di sini */}
      </View>

      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaText}>Ayo Latihan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  logo: { width: 40, height: 40, marginRight: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  content: { marginBottom: 20 },
  description: { fontSize: 16, marginBottom: 10 },
  formula: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  gameSection: { marginVertical: 20 },
  gameTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  ctaButton: { backgroundColor: '#68E6B1', padding: 15, borderRadius: 10, alignItems: 'center' },
  ctaText: { fontSize: 16, fontWeight: 'bold' },
});
