const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');


// enabling the express server to accept request from any origin.
// prevents CORS policy error.
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cipherfiles', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for the encrypted file
const fileSchema = new mongoose.Schema({
    filename: String,
    encryptedData: String,
    secretKey: String,
});


// Create a model based on the schema
const EncryptedFile = mongoose.model('EncryptedFile', fileSchema);


// Define a Schema for the user credentials
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

// creating a model based on the user Schema
const User = mongoose.model('User', userSchema);

// Using memory storage to access the file buffer directly
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//root get api
app.get('/', (req, res) => {
    res.send('Welcome to the CipherFiles File Upload and Encryption Service!');
});


//api to encrypt and upload the files
app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileBuffer = req.file.buffer;
    const secretKey = crypto.randomBytes(32).toString('hex'); // Key must be 32 bytes for aes-256-ctr
    const algorithm = 'aes-256-ctr';
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);

    let encrypted = cipher.update(fileBuffer, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    // Create a new document for the encrypted file
    const encryptedFile = new EncryptedFile({
        filename: req.file.originalname,
        encryptedData: encrypted,
        secretKey: secretKey
    });

    // Save the encrypted file document in the database
    await encryptedFile.save();

    console.log(`File encrypted with key: ${secretKey}`);
    res.json({
        message: '☑️ File uploaded and encrypted successfully.',
        secretKey: secretKey
    });
});


//api to upload the registration username and password
app.post('/api/credentials', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in /api/credentials:', error);
        res.status(500).send('Error registering user');
    }
});


app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username and password were provided
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Login failed: User not found');
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Login failed: Incorrect password');
        }

        // Login successful
        res.send({ message: 'Login successful' });
    } catch (error) {
        console.error('Error in /api/login:', error);
        res.status(500).send('Error logging in user');
    }
});


// Download a specific file
app.post('/api/download/file/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { secretKey } = req.body; // Receive the secretKey from the request body

        const file = await EncryptedFile.findById(id);
        if (!file) {
            return res.status(404).send('File not found');
        }

        // Compare the provided secret key with the stored one
        if (file.secretKey !== secretKey) {
            return res.status(401).send('Invalid secret key');
        }

        // If the keys match, proceed to send the file
        // Assuming the file's encrypted data is stored in hex format
        const buffer = Buffer.from(file.encryptedData, 'hex');
        const algorithm = 'aes-256-ctr';
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(file.secretKey, 'hex'), Buffer.from(file.iv, 'hex'));
        
        let decrypted = decipher.update(buffer);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=${file.filename}`);
        res.send(decrypted);
    } catch (error) {
        console.error('Error in /api/download/file/:id:', error);
        res.status(500).send('Error downloading file');
    }
});

//get all the files
app.get('/api/files', async (req, res) => {
    try {
        const files = await EncryptedFile.find({});
        res.json(files);
    } catch (error) {
        console.error('Error in /api/files:', error);
        res.status(500).send('Error fetching files');
    }
});

// Delete a specific file
app.delete('/api/delete/file/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const file = await EncryptedFile.findByIdAndDelete(id);
        if (!file) {
            return res.status(404).send('File not found');
        }
        res.send({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error in /api/delete/file/:id:', error);
        res.status(500).send('Error deleting file');
    }
});


app.listen(port, () => {
    console.log(`☑️ Server is running on port: ${port}`);
});
