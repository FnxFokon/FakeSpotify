import React, { useState } from 'react'
import { imgLogo } from '../constants/AppConstant';
import NavLinks from './NavLinks';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';

const Sidebar = () => {

    //on va déclarer un state 
    const [mobileMenu, setMobileMenu] = useState(false);
    return (
        <>
            <div className='md:flex hidden flex-col w-[240px] py-10 px-4 bg-black'>
                <img src={imgLogo} alt="Logo" className='w-full h-14 object-contain' />
                <NavLinks />
            </div>
            {/* gestion des icones pour ouvrir/fermer menu en petit ecran */}
            <div className="absolute md:hidden block top-6 right-3">
                {mobileMenu ? (
                    <RiCloseLine 
                    className='w-6 h-6 text-white mr-2'
                    onClick={() => setMobileMenu(false)}
                    />
                ):(
                    <HiOutlineMenu
                    className='w-6 h-6 text-white mr-2'
                    onClick={() => setMobileMenu(true)}
                    />
                )}
            </div>
            <div className={`z-20 absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#1d1d1d] backdrop-blur-lg 
             p-6 md:hidden smooth-transition ${mobileMenu ? 'left-0' : '-left-full'}`}>
                <img src={imgLogo} alt="Logo" className='w-full h-14 object-contain' />
                <NavLinks handleClick={() => setMobileMenu(false)}/>
            </div>
        </>
    )
}

export default Sidebar