import React from 'react'
import { apiImageAlbum } from '../../constants/ApiConstant'

const Track = ({ isPlaying, isActive, activeSong, currentAlbum }) => {
    return (
        <div className='flex-1 flex items-center justify-start'>
            {/* on recupère l'image de l'album */}
            <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`} >
                <img src={`${apiImageAlbum}/${currentAlbum?.imagePath}`} alt="cover album" className='rounded-full' />
            </div>
            <div className='w-[50%]'>
                <p className='truncate text-white font-bold text-lg'>
                    {activeSong?.title ?? 'Musique sans titre'}
                </p>
                <p className='truncate text-gray-300'>
                    {currentAlbum?.artist?.name ?? 'Artiste inconnu'}
                </p>
            </div>
        </div>
    )
}

export default Track