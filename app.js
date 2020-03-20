const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const expressValidator = require("express-validator");
const expressSession = require('express-session');
const flash = require('connect-flash');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const userRoutes = require('./routers/routers.user');
const productRoutes = require('./routers/routers.product');



const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.use(expressValidator());
app.use(expressSession({ secret:'max', saveUninitialized:false, resave:false }));
app.use(flash());

app.use(userRoutes);
app.use(productRoutes);




app.use((req, res, next) => {
    res.status(404).render('404.ejs', {fname:"",isAuthenticated:true,title:"404 Page"});
});

mongoose.connect('mongodb+srv://mfitz:mfitz@online-shopping-project-cw-8101z.gcp.mongodb.net/onlineshoppingdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT || 8088, () => {
            console.log(`Running on 8088`);
        });
    }).catch(err => console.error(err));