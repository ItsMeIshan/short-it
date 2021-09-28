require('dotenv').config();
const express = require('express');
const {StatusCodes} = require('http-status-codes');
const connectDb = require('./db/dbConnect');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const router = require('./routes/urlShort');
const port = process.env.PORT || 4000;
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})
//routes
app.use('/api/v1', router);

const start = async() => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, console.log(`Server listening on Port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}
start();