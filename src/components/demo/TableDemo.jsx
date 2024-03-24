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
            {showDialog && (
                <div>
                    <p>Enter the secret key to download the file:</p>
                    <input type="text" value={secretKey} onChange={e => setSecretKey(e.target.value)} />
                    <button onClick={handleDownload}>Download</button>
                    <button onClick={() => setShowDialog(false)}>Cancel</button>
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map(file => (
                        <tr key={file._id}>
                            <td>{file.filename}</td>
                            <td>
                                <button onClick={() => openDialog(file._id)}>Open</button>
                                <button onClick={() => handleDelete(file._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </>
    );
}

