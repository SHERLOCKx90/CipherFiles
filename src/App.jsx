import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { FileUploadDemo } from './components/demo/FileUploadDemo'
import { AlertDemo } from './components/demo/AlertDemo'

const App = () => {
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
      <div className='absolute top-[7rem] lg:top-[7rem]'><AlertDemo title="Heads up!" desc="You can add keep your files safe & secured with us."/></div>
      <div className='absolute top-[15rem] lg:top-[15rem]'><FileUploadDemo /></div>
    </div>
  )
}

export default App
