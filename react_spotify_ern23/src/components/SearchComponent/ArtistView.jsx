import React from 'react'
import { Link } from 'react-router-dom'
import { apiImageArtist } from '../../constants/ApiConstant';

const ArtistView = ({ dataArtist }) => {
    const imgPath = `${apiImageArtist}/${dataArtist.imagePath}`;
    return (
        <Link to="/artist-detail" state={{ params: dataArtist }}>
            <div className='flex flex-col justify-center items-center bg-black rounded-lg shadow-lg p-4'>
                <div className='flex flex-col justify-center items-center'>
                    <img src={imgPath} alt={dataArtist.name} className='rounded-full w-40 h-40 object-cover' />
                    <h3 className='font-bold text-xl text-white text-center mt-2'>{dataArtist.name}</h3>
                </div>
            </div>
        </Link>
    )
}

export default ArtistView