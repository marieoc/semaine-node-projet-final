import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})