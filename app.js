const { Pool, Client } = require('pg')
const testQueries = require('./src/db/testQuery')
const initializedTables = require('./src/db/initializedTables')
const productRoute = require('./src/routes/productRoute')
const userRoute = require('./src/routes/userRoute')
const basketRoute = require('./src/routes/basketRoute')
const express = require('express')
const app = express()
var cors = require('cors');

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const UserDB = require('./src/db/userDB');


const PORT = process.env.PORT || 3000

const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres'
const POSTGRES_DB = process.env.POSTGRES_DB || 'postgres'
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'password'
const POSTGRES_HOST = process.env.POSTGRES_HOST || '127.0.0.1';
const POSTGRES_PORT = process.env.POSTGRES_PORT ||  5432;

const ONLINE_SHOP_FRONTEND_URL = process.env.ONLINE_SHOP_FRONTEND_URL || 'http://localhost:4200'

const ENABLE_DELETION_OF_DB_DATA = process.env.ENABLE_DELETION_OF_DB_DATA || 'false';
const ENABLE_CREATION_OF_SAMPLE_DATA = process.env.ENABLE_CREATION_OF_SAMPLE_DATA || 'false';
const pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT,
})


const userDB = new UserDB(pool);
;(async ()=>{

    if (process.env.NODE_ENV === 'production') {
        app.set('trust proxy', 1); 
        app.use(require('express-session')({ 
            secret: 'keyboard cat', resave: false, saveUninitialized: false,
            cookie : {
                sameSite: 'none',
                secure: true
            }
        }));
    } 
    else {
        app.use(require('express-session')({ 
            secret: 'keyboard cat', resave: false, saveUninitialized: false,
        }));
    }
    
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new Strategy(
        async function(username, password, cb) {
          let user = await userDB.authenticate(username, password);
          if(!user){
            return cb(null, false);
          }
          return cb(null, user);
      
    }));

    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });
      
    passport.deserializeUser(function(user, cb) {
        cb(null, user);
    });

    await initializedTables(pool, ENABLE_DELETION_OF_DB_DATA, ENABLE_CREATION_OF_SAMPLE_DATA);
    app.use(express.json());
    app.use(cors({credentials: true, origin: ONLINE_SHOP_FRONTEND_URL}));
    app.use('/product', productRoute(pool));
    app.use('/user', userRoute(pool, passport))
    app.use('/basket', basketRoute(pool))
   
    app.listen(PORT, () => {
    console.log(`Online Shopping backend is listening at PORT: ${PORT}`)
    })
})()


