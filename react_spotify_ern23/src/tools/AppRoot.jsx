import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { RouterProvider } from 'react-router-dom'
import Router from './Router'
import OfflineRouter from './OfflineRouter'

const SessionContext = createContext({
    inSession: false
})

export const useSessionContext = () => useContext(SessionContext)

const AppRoot = () => {
    //on déclare des states
    const [inSession, setInSession] = useState(null)
    const {userId, setUserId, setIsGuest, setNickname, setEmail} = useAuthContext()

    const getUserInfos = async () => {
        const user = JSON.parse(localStorage.getItem('userInfos'));

        if(user){
            setUserId(user.userId);
            setIsGuest(user.isGuest);
            setNickname(user.nickname);
            setEmail(user.email);
            setInSession(true);
        }else{
            setInSession(false);
        }
    }

    useEffect(() => {

        getUserInfos()

    }, [userId])
    
    const value = {
        inSession
    }

  return (
    <Provider store={store}>
        {/* on recupere le context de session */}
        <SessionContext.Provider value={value}>
            {/* on appelle le bon router suivant le context de session */}
            <RouterProvider router={inSession ? Router : OfflineRouter} />
        </SessionContext.Provider>
    </Provider>
  )
}

export default AppRoot