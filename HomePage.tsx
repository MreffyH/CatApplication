import { RootStackParamList } from './App'; 
import React, { useState, useEffect } from 'react';
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
import { useAuth } from './context/authContext'; // Import context

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAuth(); // Gunakan user dan logout dari context
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [profileText, setProfileText] = useState(user ? 'Profile' : 'Login');

  // Tampilkan konsole user yang sedang login
  useEffect(() => {
    // Perbarui status Profile text setiap kali user berubah
    console.log("User updated in HomeScreen:", user);
    setProfileText(user ? 'Profile' : 'Login');
  }, [user]); // Dependensi pada perubahan user

  const handleNavigate = () => {
    if (selectedPage === 'GLB') {
      navigation.navigate('GLBPage');
    } else if (selectedPage === 'GLBB') {
      navigation.navigate('GLBBPage');
    } else if (selectedPage === 'Quiz' && user != null) {
      navigation.navigate('QuizScreen');
    } else if (selectedPage === 'Quiz' && user == null) {
      alert('Silakan login terlebih dahulu untuk mengakses Quiz');
    }
  };

  const handleProfilePress = () => {
    if (user) {
      navigation.navigate('LogoutPage'); 
    } else {
      navigation.navigate('LoginPage'); 
    } 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <Image source={require('./assets/1-logo.png')} style={styles.logo} />
          <Text style={styles.logoText}>
            "Make Physics More Fun"
          </Text>
        </View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={handleProfilePress} // Fungsi berubah sesuai status login
        >
          <Text style={styles.menuText}>{profileText}</Text> {/* Ubah label sesuai status login */}
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

        {/* Quiz Section */}
        <View style={styles.cardsCenter}>
          <TouchableOpacity
            style={[
              styles.card,
              selectedPage === 'Quiz' ? styles.cardSelected : null,
            ]}
            onPress={() => setSelectedPage('Quiz')}
          >
            <Image source={require('./assets/10-quiz.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>Quiz</Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View>
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
        </View>
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
    padding: 20,
    backgroundColor: '#68E6B1',
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
  cardsCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    backgroundColor: '#d3d3d3',
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
