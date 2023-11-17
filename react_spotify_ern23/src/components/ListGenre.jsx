import React from 'react'
import { Link } from 'react-router-dom';

const ListGenre = ({ dataGenre }) => {

    return (
        <div>
            <div className='flex flex-wrap justify-center gap-4 py-5 ' >
                {dataGenre && dataGenre.map((genre, index) => {
                    return genre?.albums.length > 0 && (
                        <Link key={index} to={`/genre/${genre.label}`}>
                            <label className='rounded-full bg-green_top px-4 py-2 text-white text-sm cursor-pointer'>
                                {genre.label}
                            </label>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default ListGenre


