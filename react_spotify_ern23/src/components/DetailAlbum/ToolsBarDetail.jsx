import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveAlbum, setActiveSong } from '../../redux/player/playerSlice';
import PlayPause from '../PlayPause';
import { AiFillHeart, AiFillInfoCircle, AiOutlineHeart, AiOutlineInfoCircle } from 'react-icons/ai';
import { Collapse } from 'react-collapse';
import InfoAlbum from './InfoAlbum';
import { selectUserData } from '../../redux/user/userSelector';
import { useAuthContext } from '../../tools/AuthContext';
import { fetchUserFavorite } from '../../redux/user/userSlice';
import { useParams } from 'react-router-dom';

const ToolsBarDetail = ({ dataAlbum }) => {
    const data = dataAlbum;
    const songs = dataAlbum?.songs;//tableau des chansons

    //on déclare nos states
    const [index, setIndex] = useState(0);//pour l'index de la chanson
    const [isInList, setIsInList] = useState(false);//pour savoir si l'album est dans la liste de favorie
    const [isCollapsed, setIsCollapsed] = useState(false);//pour savoir si le collapse est ouvert ou non
    const [listArray, setListArray] = useState([]); // pour la liste de favoris

    //on récupère les donnée du slice player
    const { isPlaying, activeSong } = useSelector(state => state.player);
    const { userFavorite, loading } = useSelector(selectUserData);

    //on récupère les hooks
    const dispatch = useDispatch();
    const params = useParams();
    const albumId = params.id;

    // On récupere l'id en session
    const auth = useAuthContext();
    const userId = auth.userId;

    useEffect(() => {
        dispatch(fetchUserFavorite(userId));
        checkFavorite();
    }, [])

    const checkFavorite = () => {
        if (userFavorite) {
            userFavorite.map((data) => {
                if (data.id == albumId) {
                    setIsInList(true);
                }
            })
        }
    }

    //méthode pour gérer l'état du bouton favorie
    const toggleFavorite = () => {
        setIsInList(!isInList);
        // Requete qui ajoute l'id de l'album dans la liste de favorie s'il n'existe pas
        // et le supprime s'il existe
        // On reconstruit un tableau de la liste de favoris sous le model
    }

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

    //méthode pour gérer l'état deu collapse
    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
    }


    return (
        <>
            <div className='flex items-center ml-5'>
                {/* bouton play */}
                <div className='tools-menu-detail cursor-pointer mr-3'>
                    <PlayPause
                        songs={songs}
                        handlePause={handlePauseClick}
                        handlePlay={() => handlePlayClick(0)}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        index={index}
                        data={data}
                    />
                </div>
                {/* bouton favorite */}
                <div className='cursor-pointer' onClick={() => toggleFavorite()}>
                    {isInList ?
                        <AiFillHeart className='text-green m-3' style={{ fontSize: '30px' }} />
                        :
                        <AiOutlineHeart className='text-green m-3' style={{ fontSize: '30px' }} />
                    }
                </div>
                {/* bouton collapse (pour afficher biographie) */}
                <div className='cursor-pointer' onClick={handleCollapseClick}>
                    {isCollapsed ?
                        <AiFillInfoCircle className='text-green m-3' style={{ fontSize: '30px' }} />
                        :
                        <AiOutlineInfoCircle className='text-green m-3' style={{ fontSize: '30px' }} />
                    }
                </div>
            </div>
            {/* on récupère les info du collapse */}
            <div>
                <Collapse isOpened={isCollapsed}>
                    <InfoAlbum dataAlbum={dataAlbum} />
                </Collapse>
            </div>
        </>
    )
}

export default ToolsBarDetail