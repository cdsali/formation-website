var express = require('express');
var router = express.Router();
var fn = require('./functions.js');


/* GET home page. */
router.get('/', function (req, res, next) {


    fn.GetVisibleFormation(function (result) {

        

        fn.GetEvents(function (result2) {
           

            fn.GetFormateurs('1',function (result3) {

             

                fn.GetVisibleYoga(function (result4) {

                    res.render('index', { data: result, data2: result2, data3: result3, data4:result4 });
    
                         
                    
                });  
                
            });

        });

    });
});

module.exports = router;
