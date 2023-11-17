import React from 'react'
import { apiImageAlbum } from '../constants/ApiConstant';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong, setActiveAlbum } from '../redux/player/playerSlice';
import PlayPause from './PlayPause';

const AlbumCard = ({ data, index, songs, isPlaying, activeSong }) => {
    const imgPath = `${apiImageAlbum}/${data.imagePath}`;
    const dispatch = useDispatch();
    //méthode lorsqu'on met pause
    const handlePauseClick = () => {
        dispatch(playPause(false))
    }

    //méthode qui met en play
    const handlePlayClick = (index) => {
        //on met à jour les states du player
        dispatch(setActiveSong({ songs, data, index }))
        dispatch(setActiveAlbum({ data }))
        dispatch(playPause(true))
    }

    return (
        <div className='flex flex-col w-[250px] p-4 
    bg-white_01 hover:bg-white_05 
    transition-all 
    ease-out 
    duration-500 
    animate-slideup 
    rounded-lg 
    cursor-pointer 
    group'>
            <div className='relative w-full h-56 flex flex-col'>
                <Link to={`/detail/${data.id}`}>
                    <img
                        src={imgPath}
                        alt={data.title}
                        className='card-sh rounded-lg object-cover'
                    />
                </Link>
                <div className={`absolute ${activeSong?.title == songs[index].title ? 'flex' : 'hidden'} group-hover:flex right-3 bottom-5`}>
                    <div className='group-hover:animate-slideup2 bg-[#000] outline-none rounded-full group-hover:duration-75 overflow-hidden'>
                        <PlayPause
                            songs={songs}
                            handlePause={handlePauseClick}
                            handlePlay={() => handlePlayClick(index)}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            index={index}
                            data={data}
                        />
                    </div>
                </div>
            </div>
            <Link to={`/detail/${data.id}`}>
                <div className='mt-4 flex flex-col'>
                    <p className='text-white text-xl truncate font-bold'>
                        {data.title}
                    </p>
                    <p className='text-white text-sm truncate '>
                        {data.artist.name}
                    </p>
                </div>
            </Link>
        </div>
    )
}

export default AlbumCard