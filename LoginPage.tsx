import { RootStackParamList } from './App'; 
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginPage'>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

const LoginPage: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Email dan Password harus diisi!');
            return;
        }
        // Tambahkan logika autentikasi di sini
        Alert.alert('Sukses', 'Login berhasil');
        navigation.navigate('Home'); // Navigasi ke halaman Home
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Navbar */}
            <View style={styles.navbar}>
                <View style={styles.logoContainer}>
                    <Image source={require('./assets/1-logo.png')} style={styles.logo} />
                    <Text style={styles.logoText}>"Make Physics More Fun"</Text>
                </View>
            </View>

            {/* Hero Section */}
            <ImageBackground
                source={require('./assets/2-physics.jpg')}
                style={{ width: '100%', height: 800 }}
                imageStyle={{ opacity: 0.8 }}
            >
                {/* Login Card */}
                <View style={styles.loginCard}>
                    <Text style={styles.loginTitle}>Login</Text>
                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                    {/* Login Button */}
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>LOGIN</Text>
                    </TouchableOpacity>
                    {/* Register Link */}
                    <Text style={styles.registerText}>
                        Belum punya akun?{' '}
                        <Text
                            style={styles.registerLink}
                            onPress={() => navigation.navigate('RegisterPage')}
                        >
                            Register
                        </Text>
                    </Text>
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

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
    loginCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        marginTop: 100,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    loginTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 14,
        color: '#555',
        backgroundColor: '#f9f9f9',
    },
    loginButton: {
        backgroundColor: '#68E6B1',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 14,
        color: '#555',
    },
    registerLink: {
        color: '#68E6B1',
        fontWeight: 'bold',
    },
});

export default LoginPage;
