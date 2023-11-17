import { current } from '@reduxjs/toolkit'
import React from 'react'
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'

const Controls = ({ isPlaying, isActive, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handleNextSong, handlePrevSong }) => {
    return (
        <div className='flex items-center justify-around md:w-36 lg:w-52 2xl:w-80'>
            {/* on affiche le bouton repeat */}
            <BsArrowRepeat
                size={20}
                color={repeat ? 'rgba(30,215,96,1)' : '#fff'}
                onClick={() => setRepeat((prev) => !prev)}
                className='cursor-pointer hidden sm:block'
            />
            {/* on affiche le bouton previous si on a un tableau de chanson */}
            {currentSongs && currentSongs.length > 1 &&
                <MdSkipPrevious
                    size={30}
                    color='#fff'
                    onClick={handlePrevSong}
                    className='cursor-pointer'
                />
            }
            {/* on affiche le bouton play/pause */}
            {isPlaying ? (
                //on affiche l'icone pause si le player est en play
                <BsFillPauseFill
                    size={45}
                    color='#fff'
                    onClick={handlePlayPause}
                    className='cursor-pointer'
                />
            ) : (
                <BsFillPlayFill
                    size={45}
                    color='#fff'
                    onClick={handlePlayPause}
                    className='cursor-pointer'
                />
            )}
            {/* on affiche le bouton next si on a un tableau de chanson */}
            {currentSongs && currentSongs.length > 1 &&
                <MdSkipNext
                    size={30}
                    color='#fff'
                    onClick={handleNextSong}
                    className='cursor-pointer'
                />
            }
            {/* on affiche le bouton shuffle */}
            <BsShuffle
                size={20}
                color={shuffle ? 'rgba(30,215,96,1)' : '#fff'}
                onClick={() => setShuffle((prev) => !prev)}
                className='cursor-pointer hidden sm:block'
            />
        </div>
    )
}

export default Controls