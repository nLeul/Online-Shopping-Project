const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const expressValidator = require("express-validator");
const expressSession = require('express-session');
const flash = require('connect-flash');
const csrf = require('csurf');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const userRoutes = require('./routers/routers.user');
const productRoutes = require('./routers/routers.product');

//const csrfProtection = csrf();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.use(expressValidator());
app.use(expressSession({ secret:'max', saveUninitialized:false, resave:false }));
app.use(flash());
// app.use(csrfProtection);

// app.use((req,res,next)=>{
//     res.locals.isAuthenticated = req.session.isAuthenticated;
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });
 app.use(userRoutes);
app.use(productRoutes);

// app.get("/",(req,res)=>{
//     res.send("done!! ");
// });


mongoose.connect('mongodb://localhost:27017/online-shopping-project', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(8088, () => {
            console.log('Running on 8080');
        });
    }).catch(err => console.error(err));