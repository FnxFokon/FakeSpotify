import React from 'react'
import { useLocation } from 'react-router-dom'

const ArtistDetail = () => {
  const location = useLocation();
  const data = location.state.params;
  // console.log(data);


  return (
    <div>ArtistDetail</div>
  )
}

export default ArtistDetail