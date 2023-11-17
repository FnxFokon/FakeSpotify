import React from 'react'
import HeaderDetail from './HeaderDetail'
import ToolsBarDetail from './ToolsBarDetail'
import ListAlbumSong from './ListAlbumSong'

const DetailAlbum = ({ dataAlbum }) => {
    return (
       <>
        <HeaderDetail dataAlbum={dataAlbum}/>
        <ToolsBarDetail dataAlbum={dataAlbum}/>
        <ListAlbumSong dataAlbum={dataAlbum}/>
       </>
    )
}

export default DetailAlbum