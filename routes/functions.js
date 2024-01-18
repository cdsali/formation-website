var mq = require('./db.js');



function GetFormation(callback) {

    mq.query('SELECT ID_FOR,formation.ID_F,TITLE_FOR,DUREE_FOR,PRIX_FOR,TYPE_FOR,FIN_FOR,PROGRAMME_FOR,IMAGE_FOR,LIEU_FOR,QUI_FOR,DATE_FOR,DESC_FOR,NOM_F,PRENOM_F,FONCTION_F,CONTACT_F,EMAIL_F,ADDRESS_F,WILAYA_F,IMAGE_F,ACK_F,ISVISIBLE from formation,formateur WHERE formation.ID_F=formateur.ID_F ', function (err, rows, fields) {
        if (err) throw err;

        return callback(rows);


    });

}


function GetVisibleFormation(callback) {

    mq.query('SELECT ID_FOR,formation.ID_F,TITLE_FOR,DUREE_FOR,PRIX_FOR,TYPE_FOR,FIN_FOR,PROGRAMME_FOR,IMAGE_FOR,LIEU_FOR,QUI_FOR,DATE_FOR,DESC_FOR,NOM_F,PRENOM_F,FONCTION_F,CONTACT_F,EMAIL_F,ADDRESS_F,WILAYA_F,IMAGE_F,ACK_F,ISVISIBLE from formation,formateur WHERE formation.ID_F=formateur.ID_F AND TYPE_FOR!="yoga" AND ISVISIBLE=1 ', function (err, rows, fields) {
        if (err) throw err;

        return callback(rows);
 

    });

}


function GetFormationByID(ID,callback) {

    mq.query('SELECT ID_FOR,formation.ID_F,TITLE_FOR,DUREE_FOR,PRIX_FOR,TYPE_FOR,FIN_FOR,PROGRAMME_FOR,IMAGE_FOR,LIEU_FOR,QUI_FOR,DATE_FOR,DESC_FOR,NOM_F,PRENOM_F,FONCTION_F,CONTACT_F,EMAIL_F,ADDRESS_F,WILAYA_F,IMAGE_F,ACK_F,DESC_F from formation,formateur WHERE formation.ID_F=formateur.ID_F and ID_FOR= ?',ID,function (err, rows, fields) {
        if (err) throw err;

        return callback(rows);


    });

}




function GetVisibleYoga(callback) {

    mq.query('SELECT ID_FOR,formation.ID_F,TITLE_FOR,DUREE_FOR,PRIX_FOR,TYPE_FOR,FIN_FOR,PROGRAMME_FOR,IMAGE_FOR,LIEU_FOR,QUI_FOR,DATE_FOR,DESC_FOR,NOM_F,PRENOM_F,FONCTION_F,CONTACT_F,EMAIL_F,ADDRESS_F,WILAYA_F,IMAGE_F,ACK_F,ISVISIBLE from formation,formateur WHERE formation.ID_F=formateur.ID_F AND TYPE_FOR="yoga" AND ISVISIBLE=1 ', function (err, rows, fields) {
        if (err) throw err;

        return callback(rows);
 

    });

}







function VisibleFormation(id,vis, callback) {

    mq.query('update formation set ISVISIBLE=? WHERE ID_FOR= ? ', [vis, id], function (err, rows, fields) {
        if (err) callback("0");

        else callback("1");


    });

}


function DeleteFormation(id, callback) {

    mq.query('delete from formation  WHERE ID_FOR= ? ', [id], function (err, rows, fields) {
        if (err) callback("0");

        else callback("1");


    });

}



function AddFormation(data, callback) {

    mq.query('INSERT INTO formation (ID_F,TITLE_FOR,DUREE_FOR,PRIX_FOR,TYPE_FOR,FIN_FOR,PROGRAMME_FOR,IMAGE_FOR,LIEU_FOR,QUI_FOR,DATE_FOR,DESC_FOR,ISVISIBLE) VALUES  ( ? ) ', [data], function (err, rows, fields) {
        if (err) {
            console.log(err);
            callback("0");
        }

        else callback("1");

        //console.log("1 record is inserted!!");


    });

}




/*
var sql = "INSERT INTO info (Id, Name) VALUES ('1', 'John')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record is inserted!!");
});

(ID_FOR`, `EMAIL_INS`, `CONTACT_INS`, `NAME_INS`, `GENDER_INS`, `DATENAI_INS`, `TITLE_INS`, `WILAYA_INS`, `ADDRESS_INS`, `REMARQUE_INS`, `ACK_INS`, `DATE_INS`, `DATEACK_INS`)*/
function InsertIns(data,callback) {

    mq.query('INSERT INTO inscription  VALUES  ( ? ) ', [data], function (err, rows, fields) {
        if (err) callback("0");

        else callback("1");

        //console.log("1 record is inserted!!");


    });

}


function GetInscription(callback) {

    mq.query('SELECT inscription.ID_FOR,TITLE_FOR,DATE_FOR,EMAIL_INS,NAME_INS,CONTACT_INS,GENDER_INS,DATENAI_INS,TITLE_INS,WILAYA_INS,ADDRESS_INS,REMARQUE_INS,DATE_INS,DATEACK_INS,ACK_INS from formation,inscription WHERE formation.ID_FOR=inscription.ID_FOR order by DATE_INS DESC', function (err, rows, fields) {
        if (err) throw err;

        return callback(rows);


    });

}


function ValideInscription(id, mail,val,callback) {

    mq.query('update inscription set ACK_INS=? WHERE ID_FOR= ? and EMAIL_INS= ?',[val,id,mail], function (err, rows, fields) {
        if (err) callback("0");

        else callback("1");


    });

}


function GetEvents(callback) {

    mq.query('SELECT ID_EVN,TITLE_EVN,TEXT_EVN,DATE_EVN,IMAGE1_EVN,IMAGE2_EVN,IMAGE3_EVN,IMAGE4_EVN,IMAGE5_EVN from eventt order by DATE_EVN DESC', function (err, rows, fields) {
        if (err) throw err;

        return callback(rows);


    });

}


function GetFormateurs(ack,callback) {

    mq.query('SELECT ID_F,NOM_F,PRENOM_F,FONCTION_F,CONTACT_F,EMAIL_F,ADDRESS_F,WILAYA_F,IMAGE_F,ACK_F,VIDEO_F,DESC_F from formateur where ACK_F= ? ',ack, function (err, rows, fields) {
        if (err) throw err;

        return callback(rows);


    });

}

function GetAllFormateurs(callback) {

    mq.query('SELECT ID_F,NOM_F,PRENOM_F,FONCTION_F,CONTACT_F,EMAIL_F,ADDRESS_F,WILAYA_F,IMAGE_F,ACK_F,VIDEO_F,DESC_F from formateur  ',function (err, rows, fields) {
        if (err) throw err;

        return callback(rows);


    });

}


function ValideFormateur(id,ack,callback) {

    mq.query('update formateur set ACK_F=? WHERE ID_F= ? ', [ack,id], function (err, rows, fields) {
        if (err) callback("0");

        else callback("1");


    });

}








function Insertformateur(data, callback) {

    mq.query('INSERT INTO formateur (NOM_F, PRENOM_F, FONCTION_F, CONTACT_F, EMAIL_F, ADDRESS_F, WILAYA_F, IMAGE_F, ACK_F, DESC_F) VALUES  ( ? ) ', [data], function (err, rows, fields) {
        if (err) callback("0");

        else callback("1");

        //console.log("1 record is inserted!!");


    });

}




function AddMessage(data, callback) {

    mq.query('INSERT INTO contact (NOM_C,EMAIL_C,SUBJECT_C,MESSAGE_C,DATE_C) VALUES  ( ? ) ', [data], function (err, rows, fields) {
        if (err) callback("0");

        else callback("1");

        //console.log("1 record is inserted!!");


    });

}


function AddFormateur(data, callback) {

    mq.query('INSERT INTO formateur (NOM_F,PRENOM_F,FONCTION_F,CONTACT_F,EMAIL_F,WILAYA_F,IMAGE_F,ACK_F,VIDEO_F,DESC_F) VALUES  ( ? ) ', [data], function (err, rows, fields) {
        if (err) callback("0");

        else callback("1");

        //console.log("1 record is inserted!!");


    });

}





module.exports = { GetFormation: GetFormation, GetFormationByID: GetFormationByID, InsertIns: InsertIns, GetInscription: GetInscription, ValideInscription: ValideInscription, GetEvents: GetEvents, GetFormateurs: GetFormateurs, Insertformateur: Insertformateur, AddMessage: AddMessage, GetAllFormateurs: GetAllFormateurs, AddFormateur: AddFormateur, ValideFormateur: ValideFormateur, VisibleFormation: VisibleFormation, GetVisibleFormation: GetVisibleFormation, DeleteFormation: DeleteFormation, AddFormation: AddFormation, GetVisibleYoga: GetVisibleYoga };



