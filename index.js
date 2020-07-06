const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const mainRoute = require('./routes/index');

const app = express();

mongoose.connect('mongodb://localhost/node_pug_adminPanel', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(db => console.log('Databse is connected'))
    .catch(err => console.log(err));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'pug');
app.use('/', mainRoute);

app.listen(4000, (req, res) => {
    console.log(`Server is running on port 4000`);
})