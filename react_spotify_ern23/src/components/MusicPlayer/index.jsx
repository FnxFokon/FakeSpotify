import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { nextSong, playPause, prevSong } from '../../redux/player/playerSlice';
import Track from './Track';
import Controls from './Controls';
import Seekbar from './Seekbar';
import Player from './Player';
import VolumeBar from './VolumeBar';

const MusicPlayer = () => {
    //on récupère toutes les states du slice player
    const { activeSong, currentSongs, currentAlbum, currentIndex, isActive, isPlaying } = useSelector(state => state.player);
    //on definit des states supplémentaires pour le player
    const [duration, setDuration] = useState(0);//durée de la chanson
    const [seekTime, setSeekTime] = useState(0);//récupérer la position de la barre de progression(si on déplace le curseur manuellement)
    const [appTime, setAppTime] = useState(0);//position réel de la lecture
    const [volume, setVolume] = useState(0.3);//pour gérer le volume de la chanson
    const [repeat, setRepeat] = useState(false)//si on active la fonction repeat
    const [shuffle, setShuffle] = useState(false)//si on active la fonction lecture aléatoire
    //on définit les const pour les hooks
    const dispatch = useDispatch();

    useEffect(() => {
        //si le store contient un tableau e chansons on passe la lecture à true
        if (currentSongs.length) dispatch(playPause(true))

    }, [currentIndex])//si currentIndex change => on reload le composant


    //méthode pour gérer l'état play/pause
    const handlePlayPause = () => {
        //si le player n'est pas activé on ne fait rien
        if (!isActive) return;
        //si une chanson est activé
        isPlaying ? dispatch(playPause(false)) : dispatch(playPause(true))
        // isPlaying ?? dispatch(playPause(!isPlaying))
    }

    //méthode changer de musique en avant
    const handleNextSong = () => {
        //si on n'est pas en mode "aléatoire"
        if (!shuffle) {
            dispatch(nextSong((currentIndex + 1) % currentSongs.length))
        } else {
            dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)))
        }
    }

    //méthode changer de musique en arrière
    const handlePrevSong = () => {
        if (currentIndex === 0) {
            //si l'index est a 0 on récupère le dernier index du tableau
            dispatch(prevSong(currentSongs.length))
        } else if (shuffle) {
            dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)))
        } else {
            dispatch(prevSong(currentIndex - 1))
        }
    }



    return (
        <div className='flex relative sm:px-12 px-8 w-full items-center justify-between'>
            <Track
                isPlaying={isPlaying}
                isActive={isActive}
                activeSong={activeSong}
                currentAlbum={currentAlbum}

            />
            <div className='flex-1 flex flex-col items-center justify-center'>
                <Controls
                    isPlaying={isPlaying}//état du player
                    isActive={isActive}//si le player est actif
                    repeat={repeat}//si on active la fonction repeat
                    setRepeat={setRepeat}//setter pour la fonction repeat
                    shuffle={shuffle}//si on active la fonction shuffle
                    setShuffle={setShuffle}//setter pour la fonction shuffle
                    currentSongs={currentSongs}//tableau de chansons
                    handlePlayPause={handlePlayPause}//méthode pour gérer l'état play/pause
                    handleNextSong={handleNextSong}//méthode pour changer de musique en avant
                    handlePrevSong={handlePrevSong}//méthode pour changer de musique en arrière
                />
                <Seekbar
                    value={appTime}//valeur de la barre de lecture
                    min='0'//valeur minimum de la barre de progression
                    max={duration}//valeur maximum de la barre de progression
                    onInput={(event) => setSeekTime(event.target.value)}//pour récupérer la valeur de la barre de lecture
                    setSeekTime={setSeekTime}//setter pour la valeur de la barre de lecture
                    appTime={appTime}//position réel de la lecture
                />
                <Player
                    activeSong={activeSong}//chanson active
                    volume={volume}//volume de la chanson
                    isPlaying={isPlaying}//état du player
                    seekTime={seekTime}//valeur de la barre de lecture
                    repeat={repeat}//si on active la fonction repeat
                    currentIndex={currentIndex}//index de la chanson active
                    onEnded={handleNextSong}//méthode pour changer de musique en avant
                    onTimeUpdate={((event) => setAppTime(event.target.currentTime))}//pour récupérer la valeur de la barre de lecture
                    onLoadedData={((event) => setDuration(event.target.duration))}//pour récupérer la durée de la chanson
                />
            </div>
            <VolumeBar
                value={volume}//volume de la chanson
                min='0'//valeur minimum de la barre de progression
                max='1'//valeur maximum de la barre de progression
                onChange={(event) => setVolume(event.target.value)}//pour récupérer la valeur de la barre de lecture
                setVolume={setVolume}//pour changer le volume
            />
        </div>
    )
}

export default MusicPlayer