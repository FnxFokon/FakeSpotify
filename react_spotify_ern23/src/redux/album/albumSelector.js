import { createSelector } from "@reduxjs/toolkit";

//on va récupérer les données du slice qu'on stock dans des constantes
const selectAlbums = state => state.albums.albums;
const selectLoading = state => state.albums.loading;
const selectSearchAlbum = state => state.albums.searchAlbum;
const selectSearchArtist = state => state.albums.searchArtist;
const selectSearchSong = state => state.albums.searchSong;
const selectAlbumDetail = state => state.albums.albumDetail;
const selectListGenre = state => state.albums.listGenre;
const selectAlbumsGenre = state => state.albums.albumsGenre;

//on crée le selector
export const selectAlbumData = createSelector(
    [selectAlbums, selectLoading, selectSearchAlbum, selectSearchArtist, selectSearchSong, selectAlbumDetail, selectListGenre, selectAlbumsGenre],
    //on va effectuer de la destructuration pour récupérer les données
    (albums, loading, searchAlbum, searchArtist, searchSong, albumDetail, listGenre, albumsGenre) => (
        { albums, loading, searchAlbum, searchArtist, searchSong, albumDetail, listGenre, albumsGenre })
)