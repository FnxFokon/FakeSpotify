import React from 'react'
import { useAuthContext } from '../tools/AuthContext'

const Topbar = () => {

const auth = useAuthContext();

  return (
    <div className='h-20 flex flex-row justify-start items-center bg-green_top'>
        <p className='flex-1 bg-transparent border-none placeholder-gray-500 text-xl font-bold text-white p-4'>
            {auth.nickname}
        </p>
    </div>
  )
}

export default Topbar