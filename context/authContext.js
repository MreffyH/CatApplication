import { createContext, useEffect, useContext, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    


    useEffect(() => {
        // onAuthStateChanged is a listener that listens to the user's authentication state
        const unsub = onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser(user);
                setIsAuthenticated(true);
            } else{
                setUser(null);
                setIsAuthenticated(false);
            }
        });
        return unsub
    },[])

    const login = async (email, password)=>{
        try {
            // signInWithEmailAndPassword is a method that signs in a user with email and password
            const response = await signInWithEmailAndPassword(auth, email, password);
            if (response?.user) {
                setUser(response.user);
                setIsAuthenticated(true);
                console.log("User logged in:", response.user);
                return { success: true, user: response.user };
            }
        } catch (error) {
            console.error("Login Error:", error.message);
            return { success: false, error: error.message };
        }
    }

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

    const register = async (email, password, username)=>{
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            if (response?.user && username) {
                await setDoc(doc(db, "users", response.user.uid), {
                    username,
                    email,
                    userId: response.user.uid,
                });
            }
            return { success: true, user: response?.user };
        } catch (error) {
            console.error("Register Error:", error);
            return { success: false, error: error.message };
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if(!value){
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return value;
}