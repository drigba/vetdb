/**
 * Using POST params adds an owner to a pet
 * Redirects to /pet/found/:petid after success
 */

 const moment = require("moment");
 const requireOption = require("../requireOption");
 
 module.exports = function (objectrepository) {
   return function (req, res, next) {
     
   
     if(typeof res.locals.med.felhasznalas !== 'undefined'){
        res.locals.med.felhasznalas.pop();
        res.locals.med.save(err => {
            if (err) {
                return next(err);
            }
            
            return res.redirect('/medicine/found/'+res.locals.med._id);
        });
     }
     
   };
 };
 