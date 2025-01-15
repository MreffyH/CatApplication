import { RootStackParamList } from './App';
import React, { useState, useRef, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Alert,
    ScrollView,
    Image
  } from 'react-native';
import { db } from './firebase/config';
import { ref, set } from 'firebase/database';
import { useAuth } from './context/authContext';

const quizData = [
    { question: '1. (GLB) Bila Andi memiliki kecepatan sebesar 20m/s, kira-kira berapa lama waktu yang harus ditempuh oleh Andi untuk mencapai jarak 80m?', options: ['10s', '8s', '6s', '5s', '4s'], correct: '4s' },
    { question: '2. (GLB) Sebuah mobil bergerak dengan kecepatan tetap 72 km/jam. Jarak yang ditempuh mobil setelah bergerak selama 15 menit adalah...', options: ['20km', '18km', '16km', '15km', '14km'], correct: '18km' },
    { question: '3. (GLB) Jika sebuah benda bergerak dengan kecepatan konstan 5 m/s selama 10 detik, berapakah jarak yang ditempuh?', options: ['60m', '55m', '50m', '45m', '40m'], correct: '50m' },
    { question: '4. (GLBB) Sebuah mobil bergerak dengan kecepatan awal 10 m/s dan mengalami percepatan 2 m/s². Berapa kecepatan mobil setelah 5 detik?', options: ['35m/s', '30m/s', '25m/s', '20m/s', '15m/s'], correct: '20m/s' },
    { question: '5. (GLBB) Bola dilempar vertikal ke atas dengan kecepatan awal 20 m/s. Berapa ketinggian maksimum yang dicapai bola? (g = 10 m/s²)', options: ['20m', '18m', '16m', '15m', '14m'], correct: '20m' },
    { question: '6. (GLBB) Sebuah benda jatuh bebas dari ketinggian 80 m. Berapa waktu yang dibutuhkan untuk mencapai tanah? (g = 10 m/s²)', options: ['10s', '8s', '6s', '4s', '2s'], correct: '4s' },
  ];

type QuizScreenNavigationProp = StackNavigationProp<RootStackParamList, 'QuizScreen'>;

export default function QuizScreen() {
    const navigation = useNavigation<QuizScreenNavigationProp>();
    const { user } = useAuth();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
      };
    
    const handleNext = () => {
    if (!selectedOption) {
        Alert.alert('Pilih jawaban terlebih dahulu!');
        return;
    }

    // Periksa jawaban dan perbarui skor
    if (selectedOption === quizData[currentQuestion].correct) {
        setScore(prevScore => prevScore + 1);
    }

    setAnswers(prevAnswers => ({
        ...prevAnswers,
        [currentQuestion]: selectedOption,
    }));

    // Reset pilihan dan lanjut ke soal berikutnya
    setSelectedOption(null);
    if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
    } else {
        saveResults();
        Alert.alert('Quiz Selesai', `Skor Anda: ${score + (selectedOption === quizData[currentQuestion].correct ? 1 : 0)} dari ${quizData.length}`);
    }
    };
    
    const saveResults = () => {
    if (!user) {
        Alert.alert('Error', 'Anda harus login untuk menyimpan hasil.');
        return;
    }

    const resultsRef = ref(db, `results/${user.uid}`);

    set(resultsRef, {
        answers,
        score,
        timestamp: new Date().toISOString(),
    })
        .then(() => {
        console.log('Hasil berhasil disimpan.');
        })
        .catch(error => {
        console.error('Gagal menyimpan hasil:', error);
        });
    };

    return (
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
            <View style={styles.container}>
                <View style={styles.marginWrapper}>
                    <Text style={styles.questionText}>{quizData[currentQuestion].question}</Text>
                </View>
                <FlatList
                data={quizData[currentQuestion].options}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    style={[
                        styles.optionButton,
                        selectedOption === item && styles.optionSelected,
                    ]}
                    onPress={() => handleOptionSelect(item)}
                    >
                    <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.marginWrapper}
                />
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>{currentQuestion < quizData.length - 1 ? 'Next' : 'Submit'}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
    
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    marginWrapper: {
        marginHorizontal: 20,
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
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20
    },
    optionButton: {
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    optionSelected: {
        backgroundColor: '#a3fde2',
        borderColor: '#68e6b1',
    },
    optionText: {
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: '#68e6b1',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
    },
    nextButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
