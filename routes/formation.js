var express = require('express');
var router = express.Router();
var fn = require('./functions.js');
const nodemailer = require("nodemailer");


const handlebars = require('handlebars');

const fs = require('fs');

/* GET users listing. */
router.get('/:id', function (req, res, next) {



    fn.GetFormationByID(req.params.id, function (result) {

       res.render('formation', { detail: result });
     //   res.header("Content-Type", 'application/json');
       // res.send(JSON.stringify(result));
      
    });
        

  

   
});

var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};


router.post('/inscription/:id', async function (req, res, next) {



   

    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    
    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date in YYYY-MM-DD format
   // console.log(year + "-" + month + "-" + date);

    let now = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    let curr = "2002-02-02";

    if (req.body.DATENAI_INS) curr = req.body.DATENAI_INS;




    // let data = { ID_FOR:req.params.id, EMAIL_INS: req.body.EMAIL_INS, CONTACT_INS: req.body.CONTACT_INS, NAME_INS: req.body.NAME_INS, GENDER_INS: req.body.GENDER_INS, DATENAI_INS: '1999-12-12', TITLE_INS: req.body.TITLE_INS, WILAYA_INS: req.body.WILAYA_INS, ADDRESS_INS: req.body.ADDRESS_INS, REMARQUE_INS: req.body.REMARQUE_INS,ACK_INS: '0', DATE_INS: '2008-02-02', DATEACK_INS: '2002-02-02' };
    let data = [req.params.id, req.body.EMAIL_INS, req.body.CONTACT_INS, req.body.NAME_INS, req.body.GENDER_INS, req.body.DATENAI_INS, req.body.TITLE_INS, req.body.WILAYA_INS, req.body.ADDRESS_INS, req.body.REMARQUE_INS, '0', now, '2002-02-02']; 
    fn.InsertIns(data, function (ans) {


         

        res.send(ans);

    });



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
 
    readHTMLFile(__dirname + '/hello.html', function (err, html) {
        if (err) {
            console.log('error reading file', err);
            return;
        }
        var template = handlebars.compile(html);
        var replacements = {
            username: "etabibo"
        };
        var htmlToSend = template(replacements);

        var mailOptions = {
            from: 'etabibo.contact@gmail.com',
            to: 'etabibo.contact@gmail.com',
            subject: "Formation etabibo", // Subject line
            text: "new inscription from ", // plain text body
            html: htmlToSend + "<h5>nom: " + data[3] + "</h5><h5>email: " + data[1] + "</h5><h5>phone: " + data[2] + "</h5><h5>titre: " + data[6] + "</h5><h5>Remarque : " + data[9] +"</h5> ", // html body
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


    });
    

   



});



module.exports = router;