import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { ref, set } from 'firebase/database';
import { User } from 'firebase/auth';

// Menentukan tipe untuk context auth
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean | undefined;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<{ success: boolean; user?: User; error?: string }>;
};

// Membuat context AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mendefinisikan tipe props untuk AuthContextProvider
interface AuthContextProviderProps {
  children: ReactNode;
}

// Membuat provider untuk AuthContext
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // State untuk user yang sedang login
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined); // Status autentikasi

  // Menggunakan onAuthStateChanged untuk mendeteksi perubahan status autentikasi
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
        console.log('User updated in onAuthStateChanged:', currentUser);  
        if (currentUser) {
            setUser(currentUser); // Mengatur user jika ada
            setIsAuthenticated(true); // Menandai sebagai sudah login
        } else {
            setUser(null); // Menghapus user jika tidak ada
            setIsAuthenticated(false); // Menandai sebagai belum login
        }
    });

    return unsub; // Menghapus listener saat komponen unmount
    }, []);

// Perbaikan pada fungsi login, logout, dan register:
    const login = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
        try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log('[Login Success] User:', response.user);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
        } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('[Login Error]:', errorMessage);
        return { success: false, error: errorMessage };
        }
    };
    
    const logout = async (): Promise<void> => {
        try {
            await signOut(auth);
            setUser(null); // Menghapus state user
            setIsAuthenticated(false); // Menandai status autentikasi sebagai logout
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Logout Error:', error.message);
            } else {
                console.error('Unknown Logout Error:', error);
            }
        }
    };
    
    const register = async (email: string, password: string, username: string): Promise<{ success: boolean; user?: User; error?: string }> => {
        try {
            if (!username || username.trim() === '') {
                throw new Error('Username is required and cannot be empty.');
            }
        
            const response = await createUserWithEmailAndPassword(auth, email, password);
            if (response?.user) {
                await set(ref(db, `users/${response.user.uid}`), {
                username: username.trim(),
                email,
                userId: response.user.uid,
                });
                return { success: true, user: response.user }; // Pastikan mengembalikan objek yang sesuai
            } else {
                return { success: false, error: 'User creation failed.' };
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Register Error:', error.message);
                return { success: false, error: error.message };
            } else {
                console.error('Unknown Register Error:', error);
                return { success: false, error: 'An unknown error occurred' };
            }
        }
    };
  
    

    // Mengembalikan provider dengan nilai context
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
        {children}
        </AuthContext.Provider>
    );
};

// Hook untuk mengambil nilai dari context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
