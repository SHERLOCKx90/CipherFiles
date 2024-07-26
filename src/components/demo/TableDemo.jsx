// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export function TableDemo() {
//     const [files, setFiles] = useState([]);
//     const [showDialog, setShowDialog] = useState(false);
//     const [secretKey, setSecretKey] = useState('');
//     const [selectedFileId, setSelectedFileId] = useState(null);

//     useEffect(() => {
//         fetchFiles();
//     }, []);

//     const fetchFiles = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/api/files');
//             setFiles(response.data);
//         } catch (error) {
//             console.error('Error fetching files:', error);
//             toast.error('Error fetching files');
//         }
//     };

//     const handleDelete = async (fileId) => {
//         try {
//             await axios.delete(`http://localhost:3000/api/delete/file/${fileId}`);
//             toast.success('File deleted successfully');
//             fetchFiles(); // Refresh the list after deletion
//         } catch (error) {
//             console.error('Error deleting file:', error);
//             toast.error('Error deleting file');
//         }
//     };

//     const handleDownload = async () => {
//         try {
//             const response = await axios.post(`http://localhost:3000/api/download/file/${selectedFileId}`, { secretKey }, { responseType: 'blob' });
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', 'file.txt'); // Use the actual file name or extension
//             document.body.appendChild(link);
//             link.click();
//             setShowDialog(false);
//             setSecretKey('');
//         } catch (error) {
//             console.error('Error downloading file:', error);
//             toast.error('Error downloading file');
//             setShowDialog(false);
//         }
//     };

//     const openDialog = (fileId) => {
//         setSelectedFileId(fileId);
//         setShowDialog(true);
//     };

//     return (
//         <>
//             {showDialog && (
//                 <div>
//                     <p>Enter the secret key to download the file:</p>
//                     <input type="text" value={secretKey} onChange={e => setSecretKey(e.target.value)} />
//                     <button onClick={handleDownload}>Download</button>
//                     <button onClick={() => setShowDialog(false)}>Cancel</button>
//                 </div>
//             )}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>File Name</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {files.map(file => (
//                         <tr key={file._id}>
//                             <td>{file.filename}</td>
//                             <td>
//                                 <button onClick={() => openDialog(file._id)}>Open</button>
//                                 <button onClick={() => handleDelete(file._id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </>
//     );
// }


import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function TableDemo() {
    const [files, setFiles] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [secretKey, setSecretKey] = useState('');
    const [selectedFileId, setSelectedFileId] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/files');
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
            toast.error('Error fetching files');
        }
    };

    const handleDelete = async (fileId) => {
        try {
            await axios.delete(`http://localhost:3000/api/delete/file/${fileId}`);
            toast.success('File deleted successfully');
            fetchFiles(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting file:', error);
            toast.error('Error deleting file');
        }
    };

    const handleDownload = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/download/file/${selectedFileId}`, { secretKey }, { responseType: 'blob' });
            if (response.data) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.svg'); // Adjust the filename accordingly
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast.success('File downloaded successfully');
            }
            setShowDialog(false);
            setSecretKey('');
        } catch (error) {
            console.error('Error downloading file:', error);
            toast.error('Invalid secret key or error downloading file');
            setShowDialog(false);
        }
    };

    const openDialog = (fileId) => {
        setSelectedFileId(fileId);
        setShowDialog(true);
    };

    return (
        <>

            <table className='custom-scrollbar'>
                <thead>
                    <tr className='flex flex-row justify-between font-poppins gap-16'>
                        <th>File Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map(file => (
                        <tr key={file._id} className='flex flex-row justify-between items-center'>
                            <td className='mt-5 font-normal text-gray-500'>{file.filename}</td>
                            <td className='flex flex-row justify-center items-center gap-2 ml-10 mt-5'>
                                <button onClick={() => openDialog(file._id)} className='bg-black text-white font-semibold py-1 px-4 rounded-[6px] hover:bg-gray-700 transition-all duration-150 ease-in-out hover:translate-y-1'>Open</button>
                                <button onClick={() => handleDelete(file._id)} className='px-3 py-1 bg-red-600 text-white font-semibold rounded-[6px] ml-1 hover:translate-y-1 transition-all duration-150'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {showDialog && (
                    <div className='border-2 border-gray-200 py-5 px-5'>
                        <p className='my-2'>Enter the secret key to download the file:</p>
                        <div className='flex flex-row justify-between gap-1'>
                            <input type="text" value={secretKey} onChange={e => setSecretKey(e.target.value)} className='border-[2px] border-gray-300 w-full rounded-md' />
                            <div className='flex flex-row gap-1.5'>
                                <button onClick={handleDownload} className='bg-purple-800 px-2 py-1 text-white transition-all rounded-md'>Download</button>
                                <button onClick={() => setShowDialog(false)} className='px-2 py-1 rounded-md text-gray-500 hover:text-white hover:bg-gray-400 transition-all hover:border-none'>Cancel</button></div>
                        </div>
                    </div>
                )}
            </table>

            <ToastContainer />
        </>
    );
}

