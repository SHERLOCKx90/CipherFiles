// import { useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useNavigate } from 'react-router';

// export function CardDemo({ name, tagline, button }) {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const [footer,setFooter]=useState('');



//     const handleInputChange = (setter) => (event) => {
//         setter(event.target.value);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const apiUrl = name === 'Login' ? '/api/login' : '/api/credentials';
//         try {
//             const response = await axios.post(`http://localhost:3000${apiUrl}`, {
//                 username,
//                 password,
//             });
//             console.log(response.data);
//             toast.success(`${name} successful`);
//             if (name === 'Login') {
//                 localStorage.setItem('username', username); // Store the username in localStorage
//             }    
//             setTimeout(() => {
//                 navigate('/');
//             }, 2000);
//         } catch (error) {
//             console.error('Error:', error);
//             toast.error(`Error during ${name.toLowerCase()}`);
//         }
//     };

//     return (
//         <>
//             <Card className="w-[350px] shadow-2xl border-none lg:w-fit">
//                 <CardHeader>
//                     <CardTitle>{name}</CardTitle>
//                     <CardDescription>{tagline}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleSubmit}>
//                         <div className="grid w-full items-center gap-4">
//                             <div className="flex flex-col space-y-1.5">
//                                 <Label htmlFor="username">Username</Label>
//                                 <Input
//                                     id="username"
//                                     placeholder="Enter the username"
//                                     value={username}
//                                     onChange={handleInputChange(setUsername)}
//                                 />
//                             </div>
//                             <div className="flex flex-col space-y-1.5">
//                                 <Label htmlFor="password">Password</Label>
//                                 <Input
//                                     id="password"
//                                     placeholder="Enter the password"
//                                     type="password"
//                                     value={password}
//                                     onChange={handleInputChange(setPassword)}
//                                 />
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//                 <CardFooter className="flex justify-between">
//                     <Button variant="outline">Cancel</Button>
//                     <Button onClick={handleSubmit}>{button}</Button>
//                 </CardFooter>
//                 {footer}
//             </Card>
//             <ToastContainer />
//         </>
//     );
// }


import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router';

export function CardDemo({ name, tagline, button }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };


    const handleReset = () => {
        setUsername('');
        setPassword('');
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const apiUrl = name === 'Login' ? '/api/login' : '/api/credentials';
        try {
            const response = await axios.post(`http://localhost:3000${apiUrl}`, {
                username,
                password,
            });
            console.log(response.data);
            toast.success(`${name} successful`);
            localStorage.setItem('username', username); // Store the username in localStorage
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            toast.error(`Error during ${name.toLowerCase()}`);
        }
    };

    const footerContent = name === 'Login' ?
        <span className="text-gray-600 text-sm" > Don't have an account? <span className='font-bold text-purple-800 hover:cursor-pointer' onClick={() => navigate('/registration')}>Register</span></span>
        : <span className="text-gray-600 text-sm" >Already have an account?  <span className='font-bold text-purple-800 hover:cursor-pointer' onClick={() => navigate('/login')}>Sign In</span></span>;

    return (
        <>
            <Card className="w-[350px] shadow-2xl border-none lg:w-fit h-fit py-4">
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>{tagline}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="Enter the username"
                                    value={username}
                                    onChange={handleInputChange(setUsername)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    placeholder="Enter the password"
                                    type="password"
                                    value={password}
                                    onChange={handleInputChange(setPassword)}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleReset}>Reset</Button>
                    <Button onClick={handleSubmit}>{button}</Button>
                </CardFooter>
                <div className="text-center mt-4">
                    {footerContent}
                </div>
            </Card>
            <ToastContainer />
        </>
    );
}
