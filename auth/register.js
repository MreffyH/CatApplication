import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';

export default function Register() {
    return (
        <ScrollView contentContainerStyle={StyleSheet.container}>
            {/* Navbar */}
            <View style={styles.navbar}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/1-logo.png')} style={styles.logo} />
                    <Text style={styles.logoText}>"Make Physics More Fun"</Text>
                </View>
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuText}>Beranda</Text>
                </TouchableOpacity>
            </View>

            {/* Hero Section */}
            <ImageBackground
                source={require('../assets/2-physics.jpg')}
                style={{
                    width: '100%',
                    height: 800,
                }}
                imageStyle={{ opacity: 0.8 }}
            >
                {/* Register Card */}
                <View style={styles.registerCard}>
                    <Text style={styles.loginTitle}>Register</Text>
                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Username</Text>
                        <Text style={styles.input}>Type your username</Text>
                    </View>
                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <Text style={styles.input}>Type your email</Text>
                    </View>
                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <Text style={styles.input}>Type your password</Text>
                        <TouchableOpacity>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Register Button */}
                    <TouchableOpacity style={styles.registerButton}>
                        <Text style={styles.loginButtonText}>REGISTER</Text>
                    </TouchableOpacity>
                    {/* Login Link */}
                    <Text style={styles.loginText}>
                        Sudah punya akun? <Text style={styles.loginLink}>Login</Text>
                    </Text>
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
    forgotPassword: {
        fontSize: 12,
        color: '#68E6B1',
        textAlign: 'right',
        marginTop: 5,
    },
    registerButton: {
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