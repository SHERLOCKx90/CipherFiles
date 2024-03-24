import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Registration from './Pages/Registration.jsx'
import MyFiles from './Pages/MyFiles.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/registration',
        element: <Registration />,
    },
    {
        path: '/myfiles',
        element: <MyFiles />,
    },
])

const Container = document.getElementById('root')
const root = ReactDOM.createRoot(Container)
root.render(<RouterProvider router={router} />);

