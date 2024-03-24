import React from 'react'
import { CardDemo } from '@/components/demo/CardDemo'

const Login = () => {
  return (
    <div className='relative w-screen h-screen overflow-x-hidden overflow-y-auto flex flex-col justify-start items-center'>
      <img src="../../loginbanner.svg" alt="Login banner image" className='lg:absolute absolute lg:w-screen lg:top-[-70px] top-5 z-[-10] scale-150 lg:scale-[0px]' />
      <div className='absolute top-[10rem] lg:top-[20rem]'><CardDemo name="Login" tagline="Enter your credentials to login to CipherFiles." button="Login"/></div>
    </div>
  )
}

export default Login
