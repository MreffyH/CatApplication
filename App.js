import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <Image source={require('assets/1-logo.png')} style={styles.logo} />
          <Text style={styles.logoText}>"Make Physics More Fun"</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <ImageBackground
        source={require('assets/2-physics.jpg')}
        style={styles.hero}
        imageStyle={{ opacity: 0.8 }} // Adjust opacity for better text visibility
      >
        <View style={styles.textContainer}>
          <Text style={styles.heroText}>
            Tahukah Kamu? Gerakan Lurus Yang Kita Lakukan Sehari-Hari Bisa
            Dihitung Dengan Fisika!{'\n'}
            Ada Dua Jenis: Gerak Lurus Beraturan (GLB) Dan Gerak Lurus Berubah
            Beraturan (GLBB)
          </Text>
        </View>

        {/* Cards */}
        <View style={styles.cards}>
          {/* Card 1 */}
          <View style={styles.card}>
            <Image
              source={require('assets/3-glb.jpg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>GLB</Text>
          </View>

          {/* Card 2 */}
          <View style={styles.card}>
            <Image
              source={require('assets/4-glbb.jpeg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>GLBB</Text>
          </View>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>Yuk, Eksplor Bareng!</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  menuText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  hero: {
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background for text
    padding: 10,
    borderRadius: 10,
  },
  heroText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  card: {
    alignItems: 'center',
    width: 120,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
