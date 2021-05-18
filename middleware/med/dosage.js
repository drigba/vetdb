/**
 * Using POST params adds an owner to a pet
 * Redirects to /pet/found/:petid after success
 */

 const moment = require("moment");
 const requireOption = require("../requireOption");
 
 module.exports = function (objectrepository) {
   return function (req, res, next) {
     
    if(typeof req.body.text === 'undefined'){
        return next();
    }

        res.locals.med.adagolas = req.body.text;
        res.locals.med.save(err => {
            if (err) {
                return next(err);
            }
            
            return res.redirect('/medicine/found/'+res.locals.med._id);
        });
     
   };
 };
 