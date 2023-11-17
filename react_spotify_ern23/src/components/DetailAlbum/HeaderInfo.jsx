import React from 'react'
import { apiImageAlbum, apiImageArtist } from '../../constants/ApiConstant';

const HeaderInfo = ({ dataAlbum }) => {
    const imgPath = `${apiImageArtist}/${dataAlbum?.artist?.imagePath}`;
    //on va récupérer l'année de sortie de l'album
    const releaseDate = new Date(dataAlbum?.releaseDate).getFullYear();

    //on va récupérer le nombre de titres par album
    const nbTitle = dataAlbum?.songs ? dataAlbum?.songs?.length > 1
        ? dataAlbum?.songs.length + ' titres'
        : dataAlbum?.songs.length + ' titre'
        : "Aucun titre pour cet album";

    //mini composant pour le point (uniquement accessible dans ce fichier)
    const Dot = () => (
        <p>&#8226;</p>
    )

    //traitement pour la durée total de l'album
    const durationAlbum = () => {
        const totalSeconds = dataAlbum?.songs?.map(function (num) {
            return num.duration
        }).reduce(function (a, b) {
            return a + b;
        });
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60) < 10 ? `0${Math.floor((totalSeconds % 3600) / 60)}` : Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60 < 10 ? `0${totalSeconds % 60}` : totalSeconds % 60;
        return hours > 0 ? ` ${hours}h ${minutes}min ${seconds}s` : ` ${minutes}min ${seconds}s`
    }

    return (
        <div className='flex items-center'>
            <img src={imgPath} alt={dataAlbum?.artist?.name} className='w-10 h-10 rounded-full object-cover' />
            <p className='font-bold text-base p-1'>{dataAlbum?.artist?.name}</p>
            <Dot />
            <p className='font-bold text-base p-1'>{releaseDate}</p>
            <Dot />
            <p className='font-bold text-base p-1'>{nbTitle}</p>
            <Dot />
            <p className='font-bold text-base p-1'>{durationAlbum()}</p>
        </div>
    )
}

export default HeaderInfo