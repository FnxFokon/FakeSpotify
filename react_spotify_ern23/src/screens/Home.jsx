import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums, fetchListGenre } from '../redux/album/albumSlice';
import { selectAlbumData } from '../redux/album/albumSelector';
import Loader from '../components/Loader';
import AlbumCard from '../components/AlbumCard';
import ListGenre from '../components/ListGenre';

const Home = () => {
  //constante qui récupère le hook de react-redux
  const dispatch = useDispatch();
  //on va appeller le hook de react "useEffect"
  //il représente le cycle de vie d'un composant
  useEffect(() => {
    //mécanique lorsqu'on monte le composant
    //on fait appelle au reducer pour récupérer la liste des albums
    dispatch(fetchAlbums());
    dispatch(fetchListGenre());
    return () => {
      //mécanique lorsqu'on démonte le composant
    }
  }, [/* mécanique d'update du composant */])

  //on va récuperer notre selector
  const { albums, loading, listGenre } = useSelector(selectAlbumData);
  const dataGenre = listGenre['hydra:member'];

  //on récupère les infos du slice player
  //pour savoir si une chanson est en cours de lecture et l'état du player
  const { activeSong, isPlaying } = useSelector(state => state.player);
  //on récupère le tableau d'albums
  const dataAlbum = albums['hydra:member'];

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

export default Home