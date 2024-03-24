import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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
import { Label } from "@/components/ui/label";
import axios from "axios";

export function FileUploadDemo() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [secretKey, setSecretKey] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const AuthorChange = (e) => {
    setAuthorName(e.target.value);
  }

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleFileSelect = (file) => {
    if (file) {
      setFile(file);
      console.log(true);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files.length > 1) {
      toast.error("Only one file is allowed to upload");
    } else {
      handleFileSelect(files[0]);
    }
  };

  const handleChange = (event) => {
    const files = event.target.files;
    if (files.length > 1) {
      toast.error("Only one file is allowed to upload");
    } else {
      handleFileSelect(files[0]);
    }
  };

  const handleReset = () => {
    setFile(null);
    document.getElementById("file-upload").value = null;
    setSecretKey('');
    setAuthorName('');
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:3000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('File uploaded successfully:', response.data);
        setSecretKey(response.data.secretKey); // Store the secretKey from the response
        toast.success('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Error uploading file');
      }
    } else {
      toast.error('No file selected');
    }
  };

  const copyToClipboard = () => {
    if (secretKey) {
      navigator.clipboard.writeText(secretKey).then(() => {
        toast.success('Secret key copied to clipboard!');
      }, (err) => {
        toast.error('Failed to copy secret key');
        console.error('Error copying text to clipboard', err);
      });
    }
  };

  return (
    <>
      <Card className="w-[400px] lg:w-fit max-w-lg shadow-2xl border-none">
        <CardHeader>
          <CardTitle>Upload your file</CardTitle>
          <CardDescription>Enter the required details and upload the file to keep in the database.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action="" method="post" encType="multipart/form-data">
            <div>
              <Label htmlFor="name">Author name</Label>
              <input id="name" placeholder="Name of the File Author" className="w-full px-4 py-2 border rounded-md" onChange={AuthorChange} value={authorName} />
            </div>
            <div className="flex justify-center">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full p-4 border-2 border-dashed rounded-md ${dragOver ? 'border-violet-300 bg-violet-50' : 'border-gray-300'}`}
              >
                <Label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer py-3">
                  <span className="mb-3"><img src="../../../fileupload.svg" alt="file upload" /></span>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleChange}
                  />
                  {file ? <span>{file.name}</span> : <span className="text-gray-500">Drag and drop a file here, or click to select a file</span>}
                </Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>Reset</Button>
          <Button onClick={handleUpload}>Save</Button>
        </CardFooter>
      </Card>

      {secretKey && (
        <Card className="w-[400px] max-w-lg shadow-2xl border-none mt-10 py-5 mx-auto">
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src="../../../greenkey.svg" alt="green key" />
                <span className="font-bold text-black">Secret Key:</span>
              </div>
              <Button onClick={copyToClipboard} title="Copy to clipboard" className="bg-white hover:bg-gray-200 transition duration-150 ease-linear">
                <img src="../../../copyicon.svg" alt="Copy" />
              </Button>
            </div>
            <pre className="bg-gray-100 rounded p-2 overflow-auto text-sm mt-3">{secretKey}</pre>
          </CardContent>
        </Card>
      )}

      <ToastContainer />
    </>
  );
}
