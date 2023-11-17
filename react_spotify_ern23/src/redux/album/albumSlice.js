import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../constants/ApiConstant";

//on déclare notre slice
const sliceAlbum = createSlice({
    //on lui donne un nom
    name: 'albums',
    //on doit initialiser les valeurs par default
    initialState: {
        loading: false,
        albums: [],
        searchAlbum: [],
        searchArtist: [],
        searchSong: [],
        albumDetail: [],
        listGenre: [],
        albumsGenre: [],
    },
    //reducers: permet de remplir les valeurs des states
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAlbums: (state, action) => {
            state.albums = action.payload;
        },
        setSearchAlbum: (state, action) => {
            state.searchAlbum = action.payload;
        },
        setSearchArtist: (state, action) => {
            state.searchArtist = action.payload;
        },
        setSearchSong: (state, action) => {
            state.searchSong = action.payload;
        },
        setAlbumDetail: (state, action) => {
            state.albumDetail = action.payload;
        },
        setListGenre: (state, action) => {
            state.listGenre = action.payload;
        },
        setAlbumsGenre: (state, action) => {
            state.albumsGenre = action.payload;
        },

    }
})

//on exporte les actions sous forme de constantes
export const { setLoading, setAlbums, setSearchAlbum, setSearchArtist, setSearchSong, setAlbumDetail, setListGenre, setAlbumsGenre } = sliceAlbum.actions;
//on va créer la méthode qui va permettre de récupérer les infos en bdd
export const fetchAlbums = () => async dispatch => {
    try {
        //on passe le loading à true
        dispatch(setLoading(true));
        //on récupère les infos en bdd
        const response = await axios.get(`${api}/albums?page=1&isActive=true`);
        //on doit "set" les valeurs dans le states albums
        dispatch(setAlbums(response.data));
        //on pense a repasser loading a false
        dispatch(setLoading(false));
    } catch (error) {
        // console.log(error);
        dispatch(setLoading(false));
    }
};

//on va créer la méthode qui va permettre de récupérer les infos en bdd pour la recherche
export const fetchSearch = (searchWord) => async dispatch => {
    try {
        //on passe le loading à true
        dispatch(setLoading(true));
        //on récupère les infos en bdd
        const responseAlbum = await axios.get(`${api}/albums?page=1&title=${searchWord}&isActive=true`);
        const responseArtist = await axios.get(`${api}/artists?page=1&name=${searchWord}`);
        const responseSong = await axios.get(`${api}/albums?page=1&songs.title=${searchWord}&isActive=true`);
        //on doit "set" les valeurs dans le states albums
        dispatch(setSearchAlbum(responseAlbum.data));
        dispatch(setSearchArtist(responseArtist.data));
        dispatch(setSearchSong(responseSong.data));
        //on pense a repasser loading a false
        dispatch(setLoading(false));
    } catch (error) {
        // console.log(error);
        dispatch(setLoading(false));
    }
}

//méthode qui va vider les states de recherche
export const fetchResetSearch = () => async dispatch => {
    dispatch(setSearchAlbum([]));
    dispatch(setSearchArtist([]));
    dispatch(setSearchSong([]));
};

// Méthode pour récupérer le detail d'un album
export const fetchAlbumDetail = (id) => async dispatch => {
    try {
        //on passe le loading à true
        dispatch(setLoading(true));
        //on récupère les infos en bdd
        const response = await axios.get(`${api}/albums/${id}`);
        //on doit "set" les valeurs dans le states albums
        dispatch(setAlbumDetail(response.data));
        //on pense a repasser loading a false
        dispatch(setLoading(false));
    } catch (error) {
        // console.log(error);
        dispatch(setLoading(false));
    }
}

// méthode qui récupere la liste des genres
export const fetchListGenre = () => async dispatch => {
    try {
        //on passe le loading à true
        dispatch(setLoading(true));
        //on récupère les infos en bdd
        const response = await axios.get(`${api}/genres`);
        //on doit "set" les valeurs dans le states albums
        dispatch(setListGenre(response.data));
        //on pense a repasser loading a false
        dispatch(setLoading(false));
    } catch (error) {
        // console.log(error);
        dispatch(setLoading(false));
    }
}

export const fetchAlbumsGenre = (genre) => async dispatch => {
    try {
        //on passe le loading à true
        dispatch(setLoading(true));
        //on récupère les infos en bdd
        const response = await axios.get(`${api}/albums?page=1&isActive=true&genres.label=${genre}`);
        //on doit "set" les valeurs dans le states albums
        dispatch(setAlbumsGenre(response.data));
        //on pense a repasser loading a false
        dispatch(setLoading(false));
    } catch (error) {
        // console.log(error);
        dispatch(setLoading(false));
    }
}



export default sliceAlbum.reducer;