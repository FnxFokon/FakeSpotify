import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    userId: '',
    isGuest: '',
    nickname: '',
    email: '',
    setUserId: () => { },
    setIsGuest: () => { },
    setNickname: () => { },
    setEmail: () => { },
    signIn: async () => { },
    signOut: async () => { },
});

const AuthContextProvider = ({ children }) => {
    const [userId, setUserId] = useState('');
    const [isGuest, setIsGuest] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');

    const signIn = async (user) => {
        try {
            // console.log('signin user',userId);
            setUserId(user.userId);
            setIsGuest(user.isGuest);
            setNickname(user.nickname);
            setEmail(user.email);
            localStorage.setItem('userInfos', JSON.stringify(user));
        } catch (error) {
            throw new Error(`error: ${error}`);
        }
    }

    const signOut = async () => {
        try {
            setUserId('');
            setIsGuest('');
            setNickname('');
            setEmail('');
            localStorage.removeItem('userInfos');
        } catch (error) {
            throw new Error(`error: ${error}`);
        }
    }

    const value = {
        userId,
        isGuest,
        nickname,
        email,
        setUserId,
        setIsGuest,
        setNickname,
        setEmail,
        signIn,
        signOut,
    };

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuthContext };