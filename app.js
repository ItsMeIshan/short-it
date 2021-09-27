const express = require('express');
const {StatusCodes} = require('http-status-codes');
const app = express();
const router = require('./routes/urlShort');
const port = process.env.PORT || 4000;
//middlewares
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello this is a URL shortening app!');
})
//routes
app.use('/api/v1', router);

app.listen(port, console.log(`Server listening on Port ${port}...`));