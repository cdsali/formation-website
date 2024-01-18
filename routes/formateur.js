var express = require('express');
var router = express.Router();
var fn = require('./functions.js');








router.post('/inscription', function (req, res, next) {




   // (`NOM_F`, `PRENOM_F`, `FONCTION_F`, `CONTACT_F`, `EMAIL_F`, `ADDRESS_F`, `WILAYA_F`, `IMAGE_F`, `ACK_F`, `DESC_F`)
    // let data = { ID_FOR:req.params.id, EMAIL_INS: req.body.EMAIL_INS, CONTACT_INS: req.body.CONTACT_INS, NAME_INS: req.body.NAME_INS, GENDER_INS: req.body.GENDER_INS, DATENAI_INS: '1999-12-12', TITLE_INS: req.body.TITLE_INS, WILAYA_INS: req.body.WILAYA_INS, ADDRESS_INS: req.body.ADDRESS_INS, REMARQUE_INS: req.body.REMARQUE_INS,ACK_INS: '0', DATE_INS: '2008-02-02', DATEACK_INS: '2002-02-02' };
    let data = [req.body.NOM_F, req.body.PRENOM_F, req.body.FONCTION_F, req.body.CONTACT_F, req.body.EMAIL_F, req.body.ADDRESS_F, req.body.WILAYA_F,'random.png', '0', req.body.DESC_F]; 


    fn.Insertformateur(data, function (ans) {

        res.send(ans);

    });





   





});





module.exports = router;