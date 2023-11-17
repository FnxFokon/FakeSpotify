import { createSelector } from "@reduxjs/toolkit";

//on va récupérer les données du slice qu'on stock dans des constantes
const selectLoading = state => state.user.loading;
const selectUser = state => state.user.user;
const selectFavorite = state => state.user.userFavorite

//on crée le selector
export const selectUserData = createSelector(
    [selectLoading, selectUser, selectFavorite],
    //on va effectuer de la destructuration pour récupérer les données
    (loading, user, userFavorite) => ({ loading, user, userFavorite })
)