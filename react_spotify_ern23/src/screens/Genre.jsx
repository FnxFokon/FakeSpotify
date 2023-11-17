import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbumsGenre, fetchListGenre } from '../redux/album/albumSlice';
import { selectAlbumData } from '../redux/album/albumSelector';
import Loader from '../components/Loader';
import AlbumCard from '../components/AlbumCard';
import ListGenre from '../components/ListGenre';
import { useParams } from 'react-router-dom';

const Genre = () => {

    //constante qui récupère le hook de react-redux
    const dispatch = useDispatch();
    const params = useParams();
    const name = params.name;

    //on va appeller le hook de react "useEffect"
    //il représente le cycle de vie d'un composant
    useEffect(() => {
        dispatch(fetchAlbumsGenre(name));
        dispatch(fetchListGenre());
    }, [name])

    //on récupère les infos du slice player
    //pour savoir si une chanson est en cours de lecture et l'état du player
    const { albumsGenre, loading, listGenre } = useSelector(selectAlbumData);
    const { activeSong, isPlaying } = useSelector(state => state.player);

    //on récupère le tableau d'albums
    const dataAlbum = albumsGenre['hydra:member'];
    const dataGenre = listGenre['hydra:member'];

    return (
        loading ? <Loader /> :
            <div className='flex flex-col'>
                <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
                    Tous les albums
                </h2>
                <div>
                    <ListGenre dataGenre={dataGenre} />
                </div>

                <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                    {/* on va mapper sur notre tableau d'albums */}
                    {dataAlbum && dataAlbum.map((data, index) => {
                        return (
                            //on appelle AlbumCard en lui passant les props
                            <AlbumCard
                                //on passe key en paramètre pour que chaque card est une clé unique
                                key={index}
                                //on passe data pour envoyer les infos de chaques albums
                                data={data}
                                //songs: le tableau de chanson de l'album
                                songs={data.songs}
                                //activeSong: la chanson active
                                activeSong={activeSong}
                                //isPlaying: l'état du player
                                isPlaying={isPlaying}
                                //index: l'index du tableau de chanson
                                index={0}
                            />
                        )
                    })}
                </div>
            </div>
    )
}

export default Genre