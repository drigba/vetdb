/**
 * Using POST params adds an owner to a pet
 * Redirects to /pet/found/:petid after success
 */

const moment = require("moment");
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (
      typeof req.body.text === "undefined" ||
      typeof req.body.freq === "undefined" ||
      typeof req.body.type === "undefined"
    ) {
      return next();
    }
    if (req.body.text === "" || req.body.freq === "" || req.body.type === "") {
      res.locals.err = "Invalid parameters";
      return next();
    }

    if(typeof res.locals.med.mellekhatas !== 'undefined' && res.locals.med.mellekhatas.findIndex(element =>   element.tipus === req.body.type) != -1)
    {
        const i =  res.locals.med.mellekhatas.findIndex(element =>   element.tipus === req.body.type);
       
            switch (req.body.freq) {
                case "0":
                    res.locals.med.mellekhatas[i].nagyonritka= (typeof res.locals.med.mellekhatas[i].nagyonritka === 'undefined' )? req.body.text :res.locals.med.mellekhatas[i].nagyonritka.concat(", "+req.body.text);
                    break;
                case "1":
                    res.locals.med.mellekhatas[i].ritka= (typeof res.locals.med.mellekhatas[i].ritka === 'undefined' )? req.body.text : res.locals.med.mellekhatas[i].ritka.concat(", "+req.body.text);
                    break;
                case "2":
                    res.locals.med.mellekhatas[i].nemgyakori= (typeof res.locals.med.mellekhatas[i].nemgyakori === 'undefined' )? req.body.text :res.locals.med.mellekhatas[i].nemgyakori.concat(", "+req.body.text);
                    break;
                case "3":
                    res.locals.med.mellekhatas[i].gyakori= (typeof res.locals.med.mellekhatas[i].gyakori === 'undefined' )? req.body.text :res.locals.med.mellekhatas[i].gyakori.concat(", "+req.body.text);
                    break;
            
            }
        
    }
    else{
        let q = {
            tipus : req.body.type
        }
        switch (req.body.freq) {
            
            case "0":
                
               q.nagyonritka = req.body.text;
                break;
            case "1":
                q.ritka = req.body.text;
                break;
            case "2":
                q.nemgyakori = req.body.text;
            break;
            case "3":
                q.gyakori = req.body.text;
                break;
        
        
        }
        res.locals.med.mellekhatas.push(q);
    }
    
    res.locals.med.save((err) => {
      if (err) {
        return next(err);
      }

      return res.redirect("/medicine/found/" + res.locals.med._id);
    });
  };
};
