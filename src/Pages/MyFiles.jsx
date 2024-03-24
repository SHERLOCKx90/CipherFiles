import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { TableCard } from '@/components/demo/TableCard';
import { AlertDemo } from '@/components/demo/AlertDemo';


const MyFiles = () => {
    const [username, setUsername] = useState('');

    useState(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <div className='relative w-screen h-screen overflow-x-hidden overflow-y-auto flex flex-col justify-start items-center'>
            <div className='w-screen justify-center flex flex-row items-center'><Navbar username={username} /></div>
            <img src="../banner.svg" alt="Login banner image" className='lg:absolute absolute lg:w-screen lg:top-[-70px] top-5 z-[-10] scale-150 lg:scale-[0px]' />
            <div className='absolute top-[7rem] lg:top-[7rem]'><AlertDemo title="Hey!" desc="Checkout the files you just saved recently!"/></div>
            <div className='absolute top-[15rem] lg:top-[15rem]'><TableCard /></div>
        </div>
    )
}

export default MyFiles
