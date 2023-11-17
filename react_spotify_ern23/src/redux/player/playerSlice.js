import { createSlice } from "@reduxjs/toolkit"

//initialiser les states
const initialState = {
    currentSongs: [],//tableau des chansons
    currentAlbum: [], //info de l'album
    currentIndex: 0,//index de la chanson en cours
    isActive: false,//si le player est activé
    isPlaying: false,//si le player est en lecture
    activeSong:{},//chanson en cours
}
//création du slice pour la gestion du player
const playerSlice = createSlice({
    //nom du slice
    name: 'player',
    initialState,
    reducers: {
        //tout ce que l'on stock lorsqu'on active une chanson
        setActiveSong: (state, action) => {
            //stockage de la chanson en lecture
            state.activeSong = action.payload.songs[action.payload.index];
            //stockage du tableau de chansons
            state.currentSongs = action.payload?.data?.songs;
            //stockage de l'index de la chanson en cours
            state.currentIndex = action.payload.index;
            //stockage de l'état du player
            state.isActive = true;
        },
        //récuperer les info de l'album
        setActiveAlbum: (state, action) => {
            state.currentAlbum = action.payload?.data;
        },
        //permet d'avancer la liste de lecture
        nextSong: (state, action) => {
            //on récupère la chanson dans le tableau à l'index donné
            state.activeSong = state.currentSongs[action.payload];
            //on stock le nouvel index
            state.currentIndex = action.payload;
            state.isActive = true;
        },
        //permet de reculer la liste de lecture
        prevSong: (state, action) => {
            //on récupère la chanson dans le tableau à l'index donné
            state.activeSong = state.currentSongs[action.payload];
            //on stock le nouvel index
            state.currentIndex = action.payload;
            state.isActive = true;
        },
        playPause: (state, action) => {
            //on stock l'état de la lecture
            state.isPlaying = action.payload;
        },
    }
})

//export des actions
export const { setActiveSong, setActiveAlbum, nextSong, prevSong, playPause } = playerSlice.actions;
//export du reducer
export default playerSlice.reducer;