const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routers/routers.user');
const productRoutes = require('.routers/routers.product');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);
app.use(productRoutes);

mongoose.connect('mongodb://localhost:27017/restapidemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Running on 3000');
        });
    }).catch(err => console.error(err));