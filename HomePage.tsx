import { RootStackParamList } from './App'; 
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const handleNavigate = () => {
    if (selectedPage === 'GLB') {
      navigation.navigate('GLBPage');
    } else if (selectedPage === 'GLBB') {
      navigation.navigate('GLBBPage');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <Image source={require('./assets/1-logo.png')} style={styles.logo} />
          <Text style={styles.logoText}>"Make Physics More Fun"</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}
        onPress={() => navigation.navigate('LoginPage')}>
          <Text style={styles.menuText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <ImageBackground
        source={require('./assets/2-physics.jpg')}
        style={{
          width: '100%',
          height: 800,
        }}
        imageStyle={{ opacity: 0.8 }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.heroText}>
            Tahukah Kamu? Gerakan Lurus Yang Kita Lakukan Sehari-Hari Bisa Dihitung Dengan Fisika!{'\n'}
            Ada Dua Jenis: Gerak Lurus Beraturan (GLB) Dan Gerak Lurus Berubah Beraturan (GLBB)
          </Text>
        </View>

        {/* Cards */}
        <View style={styles.cards}>
          {/* GLB Card */}
          <TouchableOpacity
            style={[
              styles.card,
              selectedPage === 'GLB' ? styles.cardSelected : null,
            ]}
            onPress={() => setSelectedPage('GLB')}
          >
            <Image source={require('./assets/3-glb.jpg')} style={styles.cardImage} />
            <Text style={styles.cardText}>GLB</Text>
          </TouchableOpacity>

          {/* GLBB Card */}
          <TouchableOpacity
            style={[
              styles.card,
              selectedPage === 'GLBB' ? styles.cardSelected : null,
            ]}
            onPress={() => setSelectedPage('GLBB')}
          >
            <Image source={require('./assets/4-glbb.jpeg')} style={styles.cardImage} />
            <Text style={styles.cardText}>GLBB</Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.ctaButton,
            selectedPage ? styles.ctaButtonActive : styles.ctaButtonDisabled,
          ]}
          disabled={!selectedPage}
          onPress={handleNavigate}
        >
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
    padding: 10,
    backgroundColor: '#68E6B1',
    borderTopWidth: 45,
    borderTopColor: '#68E6B1',
    borderBottomWidth: 1,
    borderBottomColor: '#7FEEBF',
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
    backgroundColor: '#68E6B1',
    paddingVertical: 9,
    paddingHorizontal: 9,
    borderRadius: 9,
    marginTop: 9,
  },
  menuText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
  cardSelected: {
    backgroundColor: '#d3d3d3', // Warna abu-abu untuk efek selected
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
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  ctaButtonActive: {
    backgroundColor: '#A3FDE2',
  },
  ctaButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  ctaText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
