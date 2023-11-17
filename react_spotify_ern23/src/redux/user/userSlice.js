import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../constants/ApiConstant";

//on déclare notre slice
const sliceUser = createSlice({
    //on lui donne un nom
    name: 'user',
    //on doit initialiser les valeurs par default
    initialState: {
        loading: false,
        user: {},
        userFavorite: [],
    },
    //reducers: permet de remplir les valeurs des states
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserFavorite: (state, action) => {
            state.userFavorite = action.payload
        },
    }
})

//on exporte les actions sous forme de constantes
export const { setLoading, setUser, setUserFavorite } = sliceUser.actions;

//on va créer la méthode qui va permettre de récupérer les infos en bdd
export const fetchUser = (userId) => async dispatch => {
    try {
        //on passe le loading à true
        dispatch(setLoading(true));
        const response = await axios.get(`${api}/users/${userId}`);
        dispatch(setUser(response.data));
        //on pense a repasser loading a false
        dispatch(setLoading(false));
    } catch (error) {
        // console.log(error);
        dispatch(setLoading(false));
    }
};

//on va créer la méthode qui va permettre de récupérer les infos en bdd
export const fetchUserFavorite = (userId) => async dispatch => {
    try {
        //on passe le loading à true
        dispatch(setLoading(true));
        const response = await axios.get(`${api}/users/${userId}`);

        dispatch(setUserFavorite(response.data.preferences));
        //on pense a repasser loading a false
        dispatch(setLoading(false));
    } catch (error) {
        // console.log(error);
        dispatch(setLoading(false));
    }
};



export default sliceUser.reducer;