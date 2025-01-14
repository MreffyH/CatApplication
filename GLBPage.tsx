import { RootStackParamList } from './App';
import { Easing } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const TRACK_LENGTH = 100; // Track length in meters
const SCREEN_WIDTH = Dimensions.get('window').width; // Actual screen width in pixels
const DESIGN_WIDTH = 425; // Your design reference width
const TRACK_WIDTH = (290 / DESIGN_WIDTH) * SCREEN_WIDTH; // Scale 270px based on the screen width
type GLBScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GLBPage'>;

type Props = {
  navigation : GLBScreenNavigationProp
}

export default function GLBPage() {
  const navigation = useNavigation<GLBScreenNavigationProp>();
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const [velocity, setVelocity] = useState('0');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const dotPosition = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<number | null>(null);

  console.log(`Window Dimensions: Width = ${Dimensions.get('window').width}`);

  const resetSimulation = () => {
    setTime(0);
    setIsRunning(false);
    dotPosition.setValue(0);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startSimulation = () => {
    if (isRunning || parseFloat(velocity) <= 0) return;
  
    resetSimulation();
    setIsRunning(true);
  
    const v = parseFloat(velocity); // Velocity in m/s
    const totalTime = TRACK_LENGTH / v; // Total time in seconds
  
    // Start the timer
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const currentTime = (Date.now() - startTime) / 1000; // Elapsed time in seconds
      setTime(currentTime);
  
      if (currentTime >= totalTime) {
        if (timerRef.current !== null) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setIsRunning(false);
        setScore((prev) => Math.min(prev + 1, 3)); // Increment score
      }
    }, 10) as unknown as number;
  
    // Start the animation
    Animated.timing(dotPosition, {
      toValue: 1, // Normalized range (0 to 1)
      duration: totalTime * 1000, // Total time in milliseconds
      useNativeDriver: true,
      easing: Easing.linear, // Linear motion
    }).start();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <ImageBackground 
      source={require('./assets/2-physics.jpg')} 
      style={styles.container}
    >
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={require('./assets/1-logo.png')} style={styles.logo} />
            <Text style={styles.title}>"Make Physics More Fun"</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}
            onPress={() => navigation.navigate('Home')}>
              <Text style={styles.headerButtonText}>Beranda</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* GLB Graph Card */}
          <View style={styles.card}>
            <Image 
              source={require('./assets/5-GLBgambar.png')}
              style={styles.glbGraph}
              resizeMode="contain"
            />
          </View>

          {/* Description */}
          <View style={styles.card}>
            <Text style={styles.description}>
              Gerak lurus beraturan (GLB) adalah gerak sepanjang lintasan lurus dengan kecepatan tetap, 
              di mana kecepatan benda tidak berubah baik dalam besar maupun arah. Karena kecepatannya 
              konstan, percepatan benda bernilai nol.
            </Text>
          </View>

          {/* Formula */}
          <View style={styles.card}>
            <Text style={styles.subtitle}>Rumus:</Text>
            <View style={styles.formulaContainer}>
              <View style={styles.formulaDefinitions}>
                <Text style={styles.formulaText}>• v = kecepatan (m/s)</Text>
                <Text style={styles.formulaText}>• s = jarak/tempuh (m)</Text>
                <Text style={styles.formulaText}>• t = waktu (s)</Text>
              </View>
              <Image 
                source={require('./assets/6-rumusGLB.png')}
                style={styles.formulaImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Simulation */}
          <View style={styles.card}>
            <Text style={styles.subtitle}>Coba Permainan Berikut!</Text>
            <Text style={styles.simulationSubtitle}>
              (Masukkan perkiraan waktu dan hitung kecepatannya)
            </Text>

            <View style={styles.simulationContainer}>
              <Text style={styles.infoText}>Informasi Jarak</Text>
              <Text style={styles.distanceText}>s = 20 m</Text>
              
              <View style={styles.track}>
                <View style={styles.trackLine} />
                <Animated.View
                  style={[
                    styles.dot,
                    {
                      transform: [
                        {
                          translateX: dotPosition.interpolate({
                            inputRange: [0, 1], // Normalized range
                            outputRange: [0, TRACK_WIDTH], // Map to pixel range
                          }),
                        },
                      ],
                    },
                  ]}
                />
                <View style={styles.finishLine} />

                {/* Updated Distance Markers */}
                <View style={styles.markers}>
                  {[...Array(10)].map((_, i) => (
                    <Text key={i} style={styles.markerText}>
                      {i * 10}m
                    </Text>
                  ))}
                </View>
              </View>

              <View style={styles.controls}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Kecepatan (m/s):</Text>
                  <TextInput
                    style={styles.input}
                    value={velocity}
                    onChangeText={setVelocity}
                    keyboardType="numeric"
                    editable={!isRunning}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, isRunning && styles.buttonDisabled]}
                    onPress={startSimulation}
                    disabled={isRunning}
                  >
                    <Text style={styles.buttonText}>Mulai</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={resetSimulation}
                  >
                    <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>
                    Waktu: {time.toFixed(2)} detik
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Video Section */}
          <View style={styles.card}>
            <Text style={styles.subtitle}>Mau lebih ngerti? Coba tonton video ini yuk!</Text>
            <View style={styles.videoContainer}>
              <WebView
                style={styles.video}
                source={{ uri: 'https://www.youtube.com/embed/3YCRAse9irs?si=_JSBfMwLOuN2KuHI' }}
                allowsFullscreenVideo
              />
            </View>
          </View>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.footerButton}>
              <Text style={styles.footerButtonText}>Ayo Latihan</Text>
            </TouchableOpacity>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Score: {score}/3</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#68E6B1',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 15,
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mainContent: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  glbGraph: {
    width: '100%',
    height: 200,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  simulationSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  formulaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formulaDefinitions: {
    flex: 1,
  },
  formulaText: {
    fontSize: 16,
    marginBottom: 5,
  },
  formulaImage: {
    width: 120,
    height: 120,
  },
  simulationContainer: {
    backgroundColor: '#E8F5F1',
    borderRadius: 10,
    padding: 15,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  distanceText: {
    fontSize: 14,
    marginBottom: 15,
  },
  track: {
    height: 100,
    marginVertical: 20,
    position: 'relative',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  trackLine: {
    height: 2,
    backgroundColor: '#000',
    width: '100%',
    marginTop: 40,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    position: 'absolute',
    top: 31,
  },
  finishLine: {
    width: 4,
    height: 40,
    backgroundColor: 'red',
    position: 'absolute',
    right: 0,
    top: 21,
  },
  markers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  markerText: {
    fontSize: 12,
    color: '#666',
  },
  controls: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: '#68E6B1',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  timerContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  footerButton: {
    backgroundColor: '#68E6B1',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreContainer: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  scoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoContainer: {
    height: 250, // Adjust height based on your design
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden', // To ensure rounded corners
  },
  video: {
    flex: 1,
  },
});