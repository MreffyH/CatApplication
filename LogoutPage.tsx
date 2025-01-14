import { RootStackParamList } from './App'; 
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from './context/authContext';

type LogoutPageNavigationProp = StackNavigationProp<RootStackParamList, 'LogoutPage'>;

type Props = {
    navigation: LogoutPageNavigationProp;
};

const LogoutPage: React.FC<Props> = ({ navigation }) => {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigation.navigate('Home'); // Navigate to login page after logout
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Navbar */}
            <View style={styles.navbar}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Logout</Text>
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
                {/* Logout Card */}
                <View style={styles.logoutCard}>
                    <Text style={styles.logoutTitle}>Logout</Text>
                    <Text style={styles.logoutMessage}>
                        Apakah Anda yakin untuk keluar dari akun Anda?
                    </Text>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                    >
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.homeButtonText}>Kembali ke Homepage</Text>
                    </TouchableOpacity>
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
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    menuText: {
        color: '#000',
        fontWeight: 'bold',
    },
    logoutCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        marginTop: 100,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        alignItems: 'center',
    },
    logoutTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    logoutMessage: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: '#68E6B1',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    homeButton: {
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    homeButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LogoutPage;
