import express from 'express';
import dotenv from 'dotenv';
import router from './router/router.js';
import fileUpload from 'express-fileupload';
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(fileUpload()) // req.files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})