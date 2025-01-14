import { createContext, useEffect } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth, db } from "../firebase/config.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

        } catch (error) {
            console.log(error);
        }
    }

    const logout = async ()=>{
        try {
            // signOut is a method that signs out the user
        } catch (error) {
            console.log(error);
        }
    }

    const register = async (email, password)=>{
        try {
            // createUserWithEmailAndPassword is a method that creates a user with email and password
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user', response?.user);

            await setDoc(doc(db, "users", response?.user?.uid),{
                username,
                profileUrl,
                userId: response?.user?.uid
            });
            return {success: true, user: response?.user};
        } catch (error) {
            console.log(error);
            return {success: false, error: error.message};
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