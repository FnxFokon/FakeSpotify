import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAlbumData } from '../redux/album/albumSelector';
import { fetchAlbumDetail } from '../redux/album/albumSlice';
import Loader from '../components/Loader';
import DetailAlbum from '../components/DetailAlbum';



const Detail = () => {
  //pour récupérer les datas de la route, on doit passer par un hook
  const params = useParams();

  // Pour executer la methode fetch du slice albumSlice, on utilise useDispatch
  const dispatch = useDispatch();

  // Pour récuperer les infos de albumDetail du selector albumSelector, on utilise useSelector
  const { albumDetail, loading } = useSelector(selectAlbumData);

  const id = params.id;

  useEffect(() => {
    dispatch(fetchAlbumDetail(id));
  }, [])

  // console.log(albumDetail);


  return (
    loading ? <Loader /> :
      <DetailAlbum dataAlbum={albumDetail} />//on passe les datas en props
    // <div>toto</div>
  )
}

export default Detail