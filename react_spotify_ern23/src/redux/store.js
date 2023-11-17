import { configureStore } from "@reduxjs/toolkit";
import albumsReducer from "./album/albumSlice";
import playerReducer from "./player/playerSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
    reducer: {
        //on déclarera ici les reducers
        albums: albumsReducer,
        player: playerReducer,
        user: userReducer,
    }
})

export default store;