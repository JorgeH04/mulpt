if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();     
}                 

const express = require('express');  
const path = require('path');
const methodOverride = require('method-override'); 
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.set('strictQuery', false);
const app = express();
require('./database');

const postRoutes = require('./routes/posts');   

 
//settings
app.set('port', process.env.PORT || 4000);
   
// middlewares
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(cors());  



// route
app.use('/', postRoutes);

     
// server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});          


