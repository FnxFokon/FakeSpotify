import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/user/userSlice';
import { Link, useParams } from 'react-router-dom';
import { selectUserData } from '../redux/user/userSelector';
import { apiImageAvatar, apiRoot } from '../constants/ApiConstant';
import Loader from '../components/Loader';
import { BsFillCameraFill } from 'react-icons/bs';
import { BiPencil } from 'react-icons/bi';

const Account = () => {

    const dispatch = useDispatch();
    //pour récupérer le paramètre de la route
    const params = useParams();
    const [userId, setUserId] = useState(params.id);

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [dispatch])

    const { user, loading } = useSelector(selectUserData)
    const imgPath = user?.avatar?.imagePath ? `${apiImageAvatar}/${user.avatar.imagePath}` : `${apiRoot}/images/user.png`;

    // console.log('user', user);

    if (loading) <Loader />

    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <div className="flex flex-col relative">
                <div className="flex flex-col relative">
                    <img className="w-40 h-40 rounded-full" src={imgPath} alt="user" />
                    <Link to="/edit/avatar" className='cursor-pointer'>
                        <BsFillCameraFill
                            className='w-6 h-6 text-green_06 hover:text-green_08 absolute bottom-0 right-0'
                        />
                    </Link>
                </div>
                <h2 className="text-2xl font-bold mt-5">{user.nickname}</h2>
                <p className="text-xl font-bold mt-3">{user.email}</p>
                <Link to="/edit/info" className='cursor-pointer mt-3 '>
                    <span className="flex justify-between">
                        Modifier mon Profil
                        <BiPencil
                            className='w-6 h-6 text-green_06 hover:text-green_08 '
                        />
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Account