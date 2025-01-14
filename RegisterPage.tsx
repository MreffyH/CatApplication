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
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from './context/authContext';

type RegisterPageNavigationProp = StackNavigationProp<RootStackParamList, 'RegisterPage'>;

type Props = {
    navigation: RegisterPageNavigationProp;
};

const RegisterPage: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {register} = useAuth();

    const handleRegister = async () => {
        console.log('Register button pressed');
        let response = await register(username, email, password);
        console.log('got result: ', response);
        if(!response.success){
            alert(response.message);
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
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.menuText}>Beranda</Text>
                </TouchableOpacity>
            </View>

            {/* Hero Section */}
            <ImageBackground
                source={require('./assets/2-physics.jpg')}
                style={{ width: '100%', height: 800 }}
                imageStyle={{ opacity: 0.8 }}
            >
                <View style={styles.registerCard}>
                    <Text style={styles.loginTitle}>Register</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Username</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type your username"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
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
                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.registerButtonText}>REGISTER</Text>
                    </TouchableOpacity>
                    <Text style={styles.loginText}>
                        Sudah punya akun?{' '}
                        <Text
                            style={styles.loginLink}
                            onPress={() => navigation.navigate('LoginPage')}
                        >
                            Login
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
        marginRight: 8,
    },
    logoText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },

    menuText: {
        color: '#000',
        fontWeight: 'bold',
    },
    registerCard: {
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
    registerButton: {
        backgroundColor: '#68E6B1',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 14,
        color: '#555',
    },
    loginLink: {
        color: '#68E6B1',
        fontWeight: 'bold',
    },
});

export default RegisterPage;