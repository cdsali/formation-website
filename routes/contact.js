var express = require('express');
var router = express.Router();
var fn = require('./functions.js');

const nodemailer = require("nodemailer");



const API_KEY = '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';
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion(msg) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: msg,
    });
    //console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text;
}

async function exampleUsage(msg) {
    const result = await runCompletion(msg);
    console.log(result);
}




router.post('/',async function (req, res, next) {
    /*

    let date_ob = new Date();

   
    let date = ("0" + date_ob.getDate()).slice(-2);

  
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    
    let year = date_ob.getFullYear();

 
    let hours = date_ob.getHours();

    let minutes = date_ob.getMinutes();

  
    let seconds = date_ob.getSeconds();



    let now = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    // (`NOM_F`, `PRENOM_F`, `FONCTION_F`, `CONTACT_F`, `EMAIL_F`, `ADDRESS_F`, `WILAYA_F`, `IMAGE_F`, `ACK_F`, `DESC_F`)
    // let data = { ID_FOR:req.params.id, EMAIL_INS: req.body.EMAIL_INS, CONTACT_INS: req.body.CONTACT_INS, NAME_INS: req.body.NAME_INS, GENDER_INS: req.body.GENDER_INS, DATENAI_INS: '1999-12-12', TITLE_INS: req.body.TITLE_INS, WILAYA_INS: req.body.WILAYA_INS, ADDRESS_INS: req.body.ADDRESS_INS, REMARQUE_INS: req.body.REMARQUE_INS,ACK_INS: '0', DATE_INS: '2008-02-02', DATEACK_INS: '2002-02-02' };
    let data = [req.body.NOM_C, req.body.EMAIL_C, req.body.SUBJECT_C, req.body.MESSAGE_C, now];

    console.log(data);
    fn.AddMessage(data, function (ans) {

        res.send(ans);

    });
    */
    


    let data = [req.body.NOM_C, req.body.EMAIL_C, req.body.SUBJECT_C, req.body.MESSAGE_C];

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "etabibo.contact@gmail.com",
            pass: "npyrcljwgzzimzhk",
        },
    });



    var mailOptions = {
        from: 'etabibo.contact@gmail.com',
        to: 'etabibo.contact@gmail.com',
        subject: "new message to etabibo formation", // Subject line
        text: "new message from ", // plain text body
        html: "<h5>sender name: " + data[0] + "</h5><h5>sender email: " + data[1] + "</h5><h5>subject : " + data[2] + "</h5><h5>message: " + data[3] +"</h5> ", // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send("0");
        } else {
            console.log('Email sent: ' + info.response);
            res.send("1");
        }
    });






    const transporter2 = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "etabibo.contact@gmail.com",
            pass: "npyrcljwgzzimzhk",
        },
    });



    const result2 = await runCompletion(data[3]);
   

  
    var mailOptions2 = {
        from: 'etabibo.contact@gmail.com',
        to: data[1],
        subject: "etabibo response", // Subject line
        text: "new message from ", // plain text body
        html: "<h5>Hello </h5><h5>" + result2 + "</h5> ", // html body
    };

    transporter2.sendMail(mailOptions2, function (error, info) {
        if (error) {
            console.log(error);
          //  res.send("0");
        } else {
            console.log('Email sent: ' + info.response);
           // res.send("1");
        }
    });










});





module.exports = router;