import { useState } from 'react';

import { useNavigate } from 'react-router';
import { Button } from './ui/button';

export const Navbar = ({ username }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    }

    const handleMyFiles = ()=>{
        navigate('/myfiles');
    }

    const handleNewFiles = ()=>{
        navigate('/');
    }
    return (
        <div className='relative m-0 w-full'>
            <nav className='bg-white/30 flex flex-row mx-auto justify-between items-center gap-4 px-3 py-4 lg:py-3 backdrop-blur-lg lg:flex-row lg:items-center'>
                <div className='flex flex-row gap-3'><Button onClick={handleNewFiles}>New File</Button>
                    <Button className="bg-purple-300 text-purple-900 font-medium hover:bg-purple-900 hover:text-white" onClick={handleMyFiles}>My Files</Button></div>

                <div className='lg:flex hidden'>
                    <ul className='flex gap-4 justify-center items-center mr-2'>
                        <li>
                            <div className='flex flex-row justify-between items-center gap-3'>
                                <img src="../../profile.svg" alt="profile" />
                                <p className='font-medium text-white'>{username}</p>
                            </div>
                        </li>
                        <li className='bg-red-600 px-5 py-2 text-sm text-white rounded-lg font-semibold hover:bg-red-800 hover:cursor-pointer flex flex-row justify-center items-center ml-3'><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
                <button
                    className="lg:hidden block text-white"
                    onClick={() => setIsMenuOpen(true)}
                >
                    {isMenuOpen ? '' : <img src='../../breadcrumb.svg' alt='breadcrumb' className='w-[1.5rem] mx-4 text-pink-700' />}
                </button>
            </nav>
            {isMenuOpen && (
                <div className=' z-50 absolute min-h-fit rounded-[10px] right-[0] top-[70%] w-[60%] flex flex-col items-center justify-center px-5 py-7 bg-white border-[2px] backdrop-blur-[2rem] lg:hidden'>
                    <button
                        className="absolute top-0 right-0 mt-2 mr-2 text-white"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <img src="../../cross.svg" alt="cross" className='p-3 w-[2.5rem]' />
                    </button>
                    <ul className='flex flex-col gap-4 justify-start items-start'>
                        <li>
                            <div className='flex flex-row justify-between items-center gap-3'>
                                <img src="../../profile.svg" alt="profile" />
                                <p className='font-medium text-black'>{username}</p>
                            </div>
                        </li>
                        <li>
                            <div className='bg-red-700 w-full px-[105px] text-white py-2 rounded-lg hover:bg-red-900 transition duration-200 ease-in-out hover:cursor-pointer'>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

