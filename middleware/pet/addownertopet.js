/**
 * Using POST params adds an owner to a pet
 * Redirects to /pet/found/:petid after success
 */

const moment = require("moment");
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (
      typeof req.body.date === "undefined" ||
      typeof req.body.name === "undefined" ||
      typeof req.body.phone === "undefined"
    ) {
      return next();
    }
    if( req.body.date === "" ||
     req.body.name === "" ||
     req.body.phone === ""){
         
        res.locals.err = "Invalid parameters";
        return next();
    }
    const today = moment().format("YYYY-MM-DD");   
    const dob = moment(res.locals.pet.szuletes).format("YYYY-MM-DD");
    
    if(moment(res.locals.pet.tulaj[res.locals.pet.tulaj.length-1].from).format("YYYY-MM-DD") > req.body.date || req.body.date > today || req.body.date < dob )
    {

      res.locals.err = "Invalid date";
      return next();
    }
    const human = {
        nev: req.body.name,
        from: req.body.date,
        tel: req.body.phone
    }
    
    res.locals.pet.tulaj[res.locals.pet.tulaj.length-1].to = req.body.date;
    res.locals.pet.tulaj.push(human);
    res.locals.pet.save(err => {
        if (err) {
            return next(err);
        }
        
        return res.redirect('/pet/found/'+res.locals.pet._id);
    });
  };
};
