import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { BiSearch } from 'react-icons/bi'
import { fetchSearch } from '../../redux/album/albumSlice';

const SearchBar = () => {

    //on déclare des states
    const [searchWord, setSearchWord] = useState('');
    //on appelle le hook dispatch
    const dispatch = useDispatch();
    // console.log(searchWord);
    //méthode lorsqu'on soumet le formulaire
    const handleSubmit = (e) => {
        //preventDefault: on empêche le comportement par défaut du formulaire
        e.preventDefault();
        dispatch(fetchSearch(searchWord));
    }


    return (
        <form
            autoComplete='off'
            onSubmit={handleSubmit}
            className='p-2 text-gray-400 focus-within:text-gray-600'
        >
            <label className="sr-only text-white">Quel est votre recherche ?</label>
            <div className='flex justify-start items-center'>
                <BiSearch className='w-5 h-5 ml-4' />
                <input
                    type="text"
                    className='flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4'
                    placeholder='Saisir votre recherche ?'
                    autoComplete='off'
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                />
            </div>

        </form>
    )
}

export default SearchBar