import React from 'react'
import { BsPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs'

const PlayPause = ({
    size = '60px',//on donne une valeur par défaut à size, on pourra surcharger si on le souhaite
    isPlaying, //gère l'état si on est en mode play ou pause
    songs, //tableau de chansons (ex: toutes les chanson de l'album)
    activeSong, //chanson active (ex: celle qui est en train d'être jouée)
    handlePause, //méthode qui permet de mettre en pause
    handlePlay, //méthode qui permet de mettre play
    index, //index du tableau de la chanson en cours de lecture
}) => {
    return (
        //on check si on est en mode play && 
        //si le titre de la chanson en cours de lecture == le titre de la chanson du tableau à l'index donné
        isPlaying && activeSong?.title === songs[index]?.title ?
            //si vrai on retourne l'icone pause avec la méthode handlePause
            <BsPauseCircleFill size={size} onClick={handlePause} className="text-green shadow-md" />
            :
            //si faux on retourne l'icone play avec la méthode handlePlay
            <BsPlayCircleFill size={size} onClick={handlePlay} className="text-green shadow-md" />
    )
}

export default PlayPause