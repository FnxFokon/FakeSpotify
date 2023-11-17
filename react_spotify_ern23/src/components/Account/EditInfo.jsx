import React, { useState } from 'react'
import axios from 'axios';
import { api, apiRoot } from '../../constants/ApiConstant';
import { useAuthContext } from '../../tools/AuthContext';
import { useNavigate } from 'react-router-dom';

const EditInfo = () => {

    // Recuperer les infos de l'utilisateur en session
    const auth = useAuthContext();
    const { email, userId, nickname, signOut, signIn } = auth;

    // Déclarer les states pour le formulaire
    const [emailValue, setEmailValue] = useState(email);
    const [passwordValue, setPasswordValue] = useState('');
    const [nicknameValue, setNicknameValue] = useState(nickname);
    const [error, setError] = useState('');

    // Recupere l'id de l'utilisateur connecté
    const navigate = useNavigate();

    //méthode pour vérifier que l'utilisateur en session est bien celui de la bdd
    const checkUser = async () => {
        try {
            const res = await axios.get(`${api}/users/${auth.userId}`);
            return res.data.email === auth.email;
        } catch (err) {
            // console.log('error:', err);
            return false;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log('email:', emailValue);
        // console.log('nickname:', nicknameValue);
        // console.log('password:', passwordValue);

        const userValid = await checkUser();
        // console.log('userValid:', userValid)
        if (userValid) {
            // console.log('formulaire non vide', emailValue.length > 0 && nicknameValue.length > 0 && passwordValue.length > 0)
            //on vérifie que les champs ne sont pas vides
            if (emailValue.length > 0 && nicknameValue.length > 0 && passwordValue.length > 0) {
                // tableau pour la méthode de checkPassword
                const dataCheck = {
                    id: userId,
                    password: passwordValue,
                };
                // Les datas pour le patch (on ne prend pas le mot de passe)
                const data = {
                    email: emailValue,
                    nickname: nicknameValue,
                };

                // console.log('data:', data)
                const headers = {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                };

                try {
                    //requete qui vérifie si le mot de passe est correct
                    const respPassword = await axios.post(`${apiRoot}/check-password`, dataCheck, { headers });
                    // console.log('respPassword:', respPassword.data.isPasswordValid)
                    if (respPassword.data.response) {
                        try {
                            //requete qui vérifie si l'email est déjà utilisé
                            const respEmail = await axios.get(`${api}/users?email=${emailValue}`);
                            // console.log('respEmail:', respEmail.data)
                            if (respEmail.data['hydra:member'].length > 0) {
                                setError('Cet email est déjà utilisé');
                                return;
                            } else {
                                try {
                                    //ajouter a la requete axios le header pour le patch dans le data
                                    axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';

                                    //méthode qui permet de modifier les infos de l'utilisateur
                                    const resp = await axios.patch(`${api}/users/${userId}`, data);
                                    // console.log(resp.data);
                                    const user = {
                                        userId: resp.data.id,
                                        email: resp.data.email,
                                        nickname: resp.data.nickname,
                                        isGuest: "standart",
                                    };
                                    //mise à jour du context
                                    signIn(user);
                                    navigate(`/account/${userId}`);
                                } catch (err) {
                                    // console.log(err);
                                    setError(err.response.data['hydra:description']);
                                }
                            }
                        } catch (error) {
                            // console.log(error);
                            setError('Une erreur est survenue (vérifiez votre connexion internet)');
                        }
                    } else {
                        setError('Le mot de passe est incorrect');
                    }
                } catch (err) {
                    // console.log(err);
                }
            } else {
                setError('Veuillez remplir tous les champs');
            }
        } else {
            //appel de logout
            signOut();
            //redirection vers la page login
            navigate('/');

        }
    };

    return (
        <div className='flex flex-1 h-screen flex-col justify-start items-center bg-black'>
            <h2 className='text-white font-bold text-xl pb-5'>Modifier mes infos</h2>
            <div className="text-red-600 font-bold mb-4">{error}</div>
            <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
                <div className="mb-3">
                    <label htmlFor="email" className='block text-green_06 font-bold mb-2'>Votre email</label>
                    <input
                        type="email"
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-green_06 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Votre email'
                        value={emailValue}
                        onChange={(event) => setEmailValue(event.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="nickname" className='block text-green_06 font-bold mb-2'>Votre pseudo</label>
                    <input
                        type="text"
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-green_06 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Votre pseudo'
                        value={nicknameValue}
                        onChange={(event) => setNicknameValue(event.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className='block text-green_06 font-bold mb-2'>Confirmer avec mot de passe</label>
                    <input
                        type="password"
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-green_06 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Entrer votre mot de passe'
                        value={passwordValue}
                        onChange={(event) => setPasswordValue(event.target.value)}
                    />
                </div>
                <div className='flex items-center justify-center pt-5'>
                    <button
                        className='bg-green_06 hover:bg-green_top text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='submit'
                    >
                        Modifier mes infos
                    </button>
                </div>
            </form>
        </div>);
};

export default EditInfo;