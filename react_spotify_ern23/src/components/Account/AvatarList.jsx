import React, { useEffect, useState } from "react";
import axios from "axios";
import { api, apiImageAvatar } from "../../constants/ApiConstant";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../tools/AuthContext";

const AvatarList = () => {
    //on crée un state pour stocker le retour de la requete qui va chercher tous les avatars
    const [avatars, setAvatars] = useState([]);

    useEffect(() => {
        axios.get(`${api}/avatars`).then((res) => {
            setAvatars(res.data['hydra:member']);
        }).catch((err) => {
            // console.log(err);
        })
    }, [])

    const navigate = useNavigate();
    //on récupère l'id de l'utilisateur connecté
    const auth = useAuthContext();
    const id = auth.userId;


    const handleClick = (avatar) => {
        //on crée un objet pour mettre à jour l'avatar de l'utilisateur
        const data = {
            avatar: `api/avatars/${avatar}`
        }
        //ajouter a la requete axios le header pour le patch dans le data
        axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';

        axios.patch(`${api}/users/${id}`, data).then((res) => {
            //si on à une réponse on redirige vers la page de l'utilisateur
            if (res.status === 200) {
                // on redirige vers la page account de l'utilisateur
                navigate(`/account/${id}`);
            }
        }).catch((err) => {
            // console.log(err);
        })
    }


    return (
        <>
            <h2 className='text-white text-3xl font-bold text-center pt-6'>Choisir un nouvel avatar</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-5 m-10" >
                {avatars && avatars.map((avatar) => (
                    <div key={avatar.id} className="w-30 h-30 cursor-pointer " onClick={() => { handleClick(avatar.id) }}>
                        <img
                            src={`${apiImageAvatar}/${avatar.imagePath}`}
                            alt="avatar profil"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default AvatarList