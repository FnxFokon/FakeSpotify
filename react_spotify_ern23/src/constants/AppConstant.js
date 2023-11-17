import { AiOutlineAppstoreAdd, AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { BiLibrary } from 'react-icons/bi';
import { MdFavoriteBorder } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { apiRoot } from './ApiConstant';

//on va construire 2 tableaux avec les données pour la navbar 
//1er: pour la gestion d'albums
export const dataAlbumNav = [
    { title: 'Accueil', path: '/', icon: AiOutlineHome },
    { title: 'Rechercher', path: '/search', icon: AiOutlineSearch },
    { title: 'Bibliothèque', path: '/library', icon: BiLibrary },
];

//2eme: pour la gestion de l'utilisateur
export const dataUserNav = [
    { title: 'Créer une playlist', path: '/playlist', icon: AiOutlineAppstoreAdd },
    { title: 'Titres likés', path: '/wishlist', icon: MdFavoriteBorder },
    { title: 'Mon compte', path: '/account/:id', icon: FiSettings },
]



//on récupère le logo de spotify
export const imgLogo = `${apiRoot}/images/logo.png`;

//constant de style
export const styleIcon = { width: '25px', height: '25px' };
export const tableIcon = { width: '20px', height: '20px' };