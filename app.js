import express from 'express';
import userRoutes from './routes/userRoutes.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import dotenv from 'dotenv';
import db from "./config/db.js"
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(express.json());
app.use('/api', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(cors({origin: 'http://localhost:5173',  // Allow frontend domain
    methods: ['GET', 'POST'],  }));

app.use(fileUpload({ useTempFiles: true }));
db()


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));