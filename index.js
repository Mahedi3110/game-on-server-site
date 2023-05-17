const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 7000;

//middleware
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send('server is running')
})


app.listen(port, () => {
    console.log(`Server is running on port: `)
})