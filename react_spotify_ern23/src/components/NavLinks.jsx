import React from 'react'
import { dataAlbumNav, dataUserNav } from '../constants/AppConstant';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../tools/AuthContext';
import { FiLogOut } from 'react-icons/fi';

//on crée une constante pour générer les différents onglets de la sidebar
const NavLinks = ({ handleClick }) => {

    const auth = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut();
        navigate('/');
    }
    //on récupère l'id de l'utilisateur connecté
    const id = localStorage.getItem('userInfos') ? JSON.parse(localStorage.getItem('userInfos')).userId : null;
    // // console.log('userid', id);

    return (

        <>
            <div className='mt-10'>
                {/* on va mapper sur notre 1er tableau "dataAlbumNav"*/}
                {dataAlbumNav.map((item) => (
                    <NavLink
                        key={item.title}
                        to={item.path}
                        end
                        className={"flex flex-row p-3 items-center justify-start font-medium text-sm text-white hover:bg-green_06"}
                        onClick={() => handleClick && handleClick()}
                    >
                        <item.icon className='w-6 h-6 mr-2' />
                        {item.title}
                    </NavLink>
                ))}

            </div>
            {/* on va mapper sur le 2ème tableau "dataUserNav" */}
            <div className='mt-5'>
                {dataUserNav.map((item) => (
                    <NavLink
                        key={item.title}
                        // on va remplacer l'id par celui de l'utilisateur connecté s'il y a :id dans le path
                        to={item.path.replace(':id', id ?? 0)}
                        end
                        className={"flex flex-row p-3 items-center justify-start font-medium text-sm text-white hover:bg-green_06"}
                        onClick={() => handleClick && handleClick()}
                    >
                        <item.icon className='w-6 h-6 mr-2' />
                        {item.title}
                    </NavLink>
                ))}

            </div>
            {/* on va ajouter un boutton de deconnexion */}
            <div className="mt-5">
                <button
                    onClick={() => {
                        const confirmLogout = window.confirm('Êtes-vous certain de vouloir vous déconnecter ?');
                        if (confirmLogout) {
                            handleLogout();
                        }
                    }}
                    className={"w-full flex flex-row p-3 items-center justify-start font-medium text-sm text-white hover:bg-green_06"}
                >
                    <FiLogOut className='w-6 h-6 mr-2' />
                    Deconnexion
                </button>
            </div>
        </>
    )
};


export default NavLinks