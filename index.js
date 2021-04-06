const express =require('express');
const cors = require('cors');
const bodyParser =require('body-parser');
const mongoose =require('mongoose');
const passport =require('passport');
const path =require('path');
const config =require('./config/db');
const account =require('./routes/account');
const app= express();
const port =3000;

app.use(passport.initialize()); //ініціалізація passport
app.use(passport.session());

require('./config/passport')(passport); //екстопт функції

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected',()=>{
	console.log("Успішно підключено до бд");
});

mongoose.connection.on('error',(err)=>{
	console.log("Не підключено до бд "+ err);
});

app.get('/', (req, res)=>{
	res.send('Головна сторінка браузера.');
});

app.use('/account', account);

app.listen(port,()=>{
	console.log("Сервер був запущений по порті: "+ port);
});