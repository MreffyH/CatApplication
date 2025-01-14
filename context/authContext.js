import { createContext, useEffect, useContext, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, get } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { ref, set } from "firebase/database";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            console.log('User updated in onAuthStateChanged:', currentUser);
            if (currentUser) {
                setUser(currentUser); // Memperbarui state 'user' jika ada user yang terautentikasi
                setIsAuthenticated(true); // Menandai pengguna terautentikasi
            } else {
                setUser(null); // Mengosongkan state 'user' jika tidak ada user
                setIsAuthenticated(false); // Menandai pengguna tidak terautentikasi
            }
        });
    
        return unsub; // Menghapus listener ketika komponen unmount
    }, []);
    

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login response:', response); // Log respons dari Firebase
            if (response?.user) {
                setUser(response.user); // Memperbarui state 'user'
                setIsAuthenticated(true); // Menandai pengguna terautentikasi
                console.log('User logged in successfully:', response.user);
                return { success: true, user: response.user };
            }
        } catch (error) {
            console.error('Login Error:', error.message);
            return { success: false, error: error.message };
        }
    };


    const logout = async ()=>{
        try {
            // Sign out the current user
            await signOut(auth);
            setUser(null);
            setIsAuthenticated(false);
            console.log("User logged out.");
        } catch (error) {
            console.error("Logout Error:", error.message);
        }
    }

    const register = async (email, password, username) => {
        try {
            // Validasi parameter username
            if (!username || username.trim() === "") {
                throw new Error("Username is required and cannot be empty.");
            }
    
            // Buat user dengan email dan password
            const response = await createUserWithEmailAndPassword(auth, email, password);
    
            if (response?.user) {
                console.log("Creating user in Realtime Database...");
    
                // Simpan user ke Realtime Database
                await set(ref(db, `users/${response.user.uid}`), {
                    username: username.trim(), // Pastikan username tidak kosong atau mengandung spasi
                    email,
                    userId: response.user.uid,
                });
    
                console.log("User registered and added to database:", response.user);
                return { success: true, user: response.user };
            } else {
                throw new Error("User creation failed.");
            }
        } catch (error) {
            console.error("Register Error:", error.message || error);
            return { success: false, error: error.message || "An unknown error occurred" };
        }
    };
    

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if(!value){
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return value;
}