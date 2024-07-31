# CipherFiles ⚡

## End-to-End Encrypted File Storing Web Application 🔐📂

This project is a prototype (v1) for CipherFiles, an end-to-end AES-256-CTR algorithm encrypted file storing web application. It is built using React JS, Shadcn UI, Tailwind CSS, React-Router on the frontend, and Node JS, Express JS, multer, mongoose, crypto, bcryptJS on the backend.

### Features

- Secure file storage with AES-256-CTR encryption
- User authentication and management
- Responsive design with Tailwind CSS and Shadcn UI
- RESTful API backend with Express JS

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB

### Steps

1. **Clone the Repository**

    ```sh
    git clone https://github.com/SHERLOCKx90/CipherFiles.git
    cd CipherFiles
    ```

2. **Install Frontend Dependencies**

    ```sh
    cd frontend
    npm install
    # or
    yarn install
    ```

3. **Install Backend Dependencies**

    ```sh
    cd ../backend
    npm install
    # or
    yarn install
    ```

4. **Configure Environment Variables**

    - Create a `.env` file in the root of the `backend` directory
    - Add your MongoDB connection string and other configurations:

    ```env
    MONGO_URI=your-mongodb-uri
    SECRET_KEY=your-secret-key
    ```

5. **Run the Application**

    - Start the backend server:

    ```sh
    cd backend
    npm run start
    # or
    yarn start
    ```

    - Start the frontend development server:

    ```sh
    cd ../frontend
    npm run dev
    # or
    yarn dev
    ```

## Usage

1. **Register and Login**

    - Users can register and login to the application.
    - Passwords are hashed using bcryptJS.

2. **File Encryption and Storage**

    - Files are encrypted using AES-256-CTR algorithm before storage.
    - Encrypted files are stored in MongoDB using multer.

3. **Retrieve and Decrypt Files**

    - Encrypted files can be retrieved and decrypted using the user's secret key.

For more details and updates, refer to the [CipherFiles GitHub Repository](https://github.com/SHERLOCKx90/CipherFiles).
