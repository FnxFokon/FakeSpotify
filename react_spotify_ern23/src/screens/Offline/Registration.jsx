import React, { useState } from 'react'
import { useAuthContext } from '../../tools/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiRoot } from '../../constants/ApiConstant';

const Registration = () => {
    //on declare des states pour les inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    //on doit récupérer la méthode signIn du contexte
    const { signIn } = useAuthContext()
    //on récupère le hook de navigation
    const navigate = useNavigate();

    //on crée la méthode pour le submit du formulaire
    const handleSubmit = (event) => {
        //event.preventDefault() permet d'empêcher la mécanique par défaut du formulaire
        event.preventDefault();
        axios.post(`${apiRoot}/register`, {
            email,
            password,
            nickname
        }).then((response) => {
            if (response.data.email) {
                const user = {
                    userId: response.data.id,
                    email: response.data.email,
                    nickname: response.data.nickname,
                    isGuest: "standart",
                }
                try {
                    signIn(user);
                    navigate('/');
                } catch (error) {
                    // console.log('error:', error);
                }
            }
        }).catch((error) => {
            // console.log(error)
        })
    }


    return (
        <div className='flex flex-1 h-screen flex-col justify-start items-center bg-black'>
            <h2 className='text-white font-bold text-xl pb-5'>Enregistrez vous</h2>
            <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
                <div className="mb-3">
                    <label htmlFor="email" className='block text-green_06 font-bold mb-2'>Votre email</label>
                    <input
                        type="email"
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-green_06 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Votre email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className='block text-green_06 font-bold mb-2'>Votre mot de passe</label>
                    <input
                        type="password"
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-green_06 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Votre mot de passe'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="nickname" className='block text-green_06 font-bold mb-2'>Votre pseudo</label>
                    <input
                        type="text"
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-green_06 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Votre pseudo'
                        value={nickname}
                        onChange={(event) => setNickname(event.target.value)}
                    />
                </div>
                <Link to='/' className='text-white'>Vous avez déjà un compte ?</Link>
                <div className='flex items-center justify-center pt-5'>
                    <button
                        className='bg-green_06 hover:bg-green_top text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='submit'
                    >
                        S'enregistrer
                    </button>
                </div>
            </form>

        </div>
    )
}

export default Registration