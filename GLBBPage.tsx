import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';

import { Canvas, Circle, Line, Group } from '@shopify/react-native-skia';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CANVAS_HEIGHT = 300;
const GRAVITY = 9.81; // m/s²
const SCALE_FACTOR = 10; // Pixels per meter

export default function GLBBPage() {
  // GLBB Calculator states
  const [acceleration, setAcceleration] = useState('');
  const [initialVelocity, setInitialVelocity] = useState('');
  const [time, setTime] = useState('');
  const [finalVelocity, setFinalVelocity] = useState('');
  const [distance, setDistance] = useState('');

  // Game states
  const [gameVelocity, setGameVelocity] = useState('20');
  const [angle, setAngle] = useState('45');
  const [isSimulating, setIsSimulating] = useState(false);
  const [score, setScore] = useState(0);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: CANVAS_HEIGHT });
  
  const animationRef = useRef<number>();
  const startTime = useRef<number>();

  const target = { x: 250, y: 150, radius: 20 };

  const calculateGLBB = () => {
    const a = parseFloat(acceleration) || 0;
    const v0 = parseFloat(initialVelocity) || 0;
    const t = parseFloat(time) || 0;

    const v = v0 + a * t;
    const s = v0 * t + 0.5 * a * t * t;

    setFinalVelocity(v.toFixed(2));
    setDistance(s.toFixed(2));
  };

  const startSimulation = () => {
    if (isSimulating) return;
    
    setIsSimulating(true);
    startTime.current = Date.now();
    
    const v0 = parseFloat(gameVelocity);
    const theta = (parseFloat(angle) * Math.PI) / 180;
    const v0x = v0 * Math.cos(theta);
    const v0y = v0 * Math.sin(theta);
    
    const animate = () => {
      const t = (Date.now() - startTime.current!) / 1000;
      const x = v0x * t * SCALE_FACTOR;
      const y = CANVAS_HEIGHT - (v0y * t - 0.5 * GRAVITY * t * t) * SCALE_FACTOR;
      
      setBallPosition({ x, y });
      
      // Check if ball hits target
      const dx = x - target.x;
      const dy = y - target.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < target.radius) {
        setScore(prev => Math.min(prev + 1, 3));
        Alert.alert('Selamat!', 'Anda berhasil mengenai target!');
        setIsSimulating(false);
        return;
      }
      
      // Check if ball is out of bounds
      if (y > CANVAS_HEIGHT || x > SCREEN_WIDTH || y < 0) {
        setIsSimulating(false);
        return;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  const resetSimulation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setBallPosition({ x: 0, y: CANVAS_HEIGHT });
    setIsSimulating(false);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Draw grid lines
  const gridLines = [];
  for (let i = 0; i <= CANVAS_HEIGHT; i += 50) {
    gridLines.push(
      <Line 
        key={`h${i}`}
        p1={{ x: 0, y: i }}
        p2={{ x: SCREEN_WIDTH, y: i }}
        color="#CCCCCC"
        style="stroke"
        strokeWidth={1}
      />
    );
  }
  for (let i = 0; i <= SCREEN_WIDTH; i += 50) {
    gridLines.push(
      <Line
        key={`v${i}`}
        p1={{ x: i, y: 0 }}
        p2={{ x: i, y: CANVAS_HEIGHT }}
        color="#CCCCCC"
        style="stroke"
        strokeWidth={1}
      />
    );
  }

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
            <TouchableOpacity style={styles.headerButton}>
              <Text style={styles.headerButtonText}>Beranda</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Text style={styles.headerButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* GLBB Graph Card */}
          <View style={styles.card}>
            <Image 
              source={require('./assets/7-GLBBgambar.png')}
              style={styles.glbGraph}
              resizeMode="contain"
            />
          </View>

          {/* Description */}
          <View style={styles.card}>
            <Text style={styles.description}>
              Gerak lurus berubah beraturan (GLBB) adalah gerak yang terjadi di sepanjang 
              lintasan lurus dengan perubahan kecepatan tetap. Artinya, kecepatan gerak benda 
              berubah secara teratur setiap detiknya, sehingga perubahan kecepatannya tetap.
            </Text>
          </View>

          {/* Formula */}
          <View style={styles.card}>
            <Text style={styles.subtitle}>Rumus:</Text>
            <View style={styles.formulaContainer}>
              <View style={styles.formulaDefinitions}>
                <Text style={styles.formulaText}>• v = kecepatan (m/s)</Text>
                <Text style={styles.formulaText}>• s = jarak tempuh (m)</Text>
                <Text style={styles.formulaText}>• t = waktu (s)</Text>
              </View>
              <Image 
                source={require('./assets/8-rumusGLBB.png')}
                style={styles.formulaImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Simulation Game */}
          <View style={styles.card}>
            <Text style={styles.subtitle}>Simulator GLBB</Text>
            <Text style={styles.simulationSubtitle}>
              (Anda bisa menggerakkan bulatan dengan mouse)
            </Text>

            <View style={styles.gameContainer}>
              <Canvas style={styles.gameCanvas}>
                <Group>
                  {gridLines}
                  <Line 
                    p1={{ x: 0, y: CANVAS_HEIGHT }}
                    p2={{ x: SCREEN_WIDTH, y: CANVAS_HEIGHT }}
                    color="black"
                    style="stroke"
                    strokeWidth={2}
                  />
                  <Circle cx={target.x} cy={target.y} r={target.radius} color="rgba(0, 0, 255, 0.3)" />
                  <Circle cx={ballPosition.x} cy={ballPosition.y} r={10} color="red" />
                </Group>
              </Canvas>

              <View style={styles.gameControls}>
                <View style={styles.inputRow}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Kecepatan Awal (m/s)</Text>
                    <TextInput
                      style={styles.input}
                      value={gameVelocity}
                      onChangeText={setGameVelocity}
                      keyboardType="numeric"
                      editable={!isSimulating}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Sudut (derajat)</Text>
                    <TextInput
                      style={styles.input}
                      value={angle}
                      onChangeText={setAngle}
                      keyboardType="numeric"
                      editable={!isSimulating}
                    />
                  </View>
                </View>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.button, isSimulating && styles.buttonDisabled]}
                    onPress={startSimulation}
                    disabled={isSimulating}
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
              </View>
            </View>
          </View>

          {/* Footer */}
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
  gameContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
  },
  gameCanvas: {
    width: '100%',
    height: CANVAS_HEIGHT,
    backgroundColor: 'white',
  },
  gameControls: {
    marginTop: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 15,
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
  buttonRow: {
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
});