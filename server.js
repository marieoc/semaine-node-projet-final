const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})