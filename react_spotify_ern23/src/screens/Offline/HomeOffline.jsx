import React, { useEffect } from 'react'
import { useSessionContext } from '../../tools/AppRoot'
import { Outlet, useNavigate } from 'react-router-dom';
import { imgLogo } from '../../constants/AppConstant';

const HomeOffline = () => {
    const { inSession } = useSessionContext();
    const navigate = useNavigate();

    useEffect(() => {
        // if (!inSession) navigate('/', { replace: true })
    }, [inSession])


    return (
        <>
            <div className='w-screen bg-black py-12'>
                <img src={imgLogo} alt="Logo" className='w-full h-28 object-contain' />
            </div>
            <Outlet />
        </>
    )
}

export default HomeOffline