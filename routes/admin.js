var express = require('express');
var router = express.Router();
var fn = require('./functions.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/img/formation/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    }
});






/* GET users listing. */
router.get('/', function(req, res, next) {
/*
    fn.GetInscription( function (result) {

       
        res.render('admin', { list: result });

    });
    */


    res.render('login');

    
});


router.get('/formateurs', function (req, res, next) {

    fn.GetAllFormateurs(function (result) {

       res.render('adminformateurs', { list: result });

    });

   


});

router.post('/ACKFORMATEUR/:id/:ack', function (req, res, next) {



    fn.ValideFormateur(parseInt(req.params.id),req.params.ack, function (result) {

        res.send(result);



    });

});


router.post('/ADDFORMATEUR', (req, res) => {
    //let data = [req.body.NOM_C, req.body.EMAIL_C, req.body.SUBJECT_C, req.body.MESSAGE_C];
    // fn.AddFormateur

});



router.post('/PAY/:id/:mail/:val', function (req, res, next) {


   //console.log(req.params);

    fn.ValideInscription(parseInt(req.params.id), req.params.mail, req.params.val, function (result) {

        res.send(result);
        
        

    });

});


router.post('/login', (req, res) => {
    fn.GetInscription(function (result) {

        let username = req.body.username;
        let password = req.body.password;
        if (username == "admin" && password == "admin") res.render('admin', { list: result });

    });
  //   res.send(`Username: ${username} Password: ${password}`);
});


router.get('/formations', function (req, res, next) {
    
    fn.GetFormation(function (result) {
        fn.GetAllFormateurs(function (result2) {

            res.render('adminformation', { list: result, combo: result2 });
        }
        );
        

    });




});


router.post('/VISIBLEFORMATION/:id/:vis', function (req, res, next) {


    //console.log(req.params);

    fn.VisibleFormation(parseInt(req.params.id), req.params.vis, function (result) {

        res.send(result);



    });

});



router.post('/DELETEFORMATION/:id', function (req, res, next) {


    //console.log(req.params);

    fn.DeleteFormation(parseInt(req.params.id), function (result) {

        res.send(result);



    });

});



router.post('/ADDFORMATION', upload.single('IMAGE_FOR'),function (req, res, next) {
    

    console.log(req.file);

   
   
    let isvisible;
    req.body.ISVISIBLE == "oui" ? isvisible = "1" : isvisible = "0";
    

    //ID_FOR, ID_F, TITLE_FOR, DUREE_FOR, PRIX_FOR, TYPE_FOR, FIN_FOR, PROGRAMME_FOR, IMAGE_FOR, LIEU_FOR, QUI_FOR, DATE_FOR, DESC_FOR, ISVISIBLE
    data = [req.body.ID_F, req.body.TITLE_FOR, req.body.DUREE_FOR, parseFloat(req.body.PRIX_FOR), req.body.TYPE_FOR, req.body.FIN_FOR, req.body.PROGRAMME_FOR, "formation/" + req.file.filename, req.body.LIEU_FOR, req.body.QUI_FOR, req.body.DATE_FOR, req.body.DESC_FOR, isvisible];
    fn.AddFormation(data, function (result) {

       
       






       res.send(result);



    });

});










module.exports = router;
