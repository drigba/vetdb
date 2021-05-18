/**
 * Using POST params adds an owner to a pet
 * Redirects to /pet/found/:petid after success
 */

const moment = require("moment");
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const MedicineModel = requireOption(objectrepository, "MedicineModel");
  return function (req, res, next) {
    if (
      typeof req.body.freq === "undefined" ||
      typeof req.body.type === "undefined"
    ) {
      return next();
    }
    if (req.body.freq === "" || req.body.type === "") {
      res.locals.err = "Invalid parameters";
      return next();
    }

    if (typeof res.locals.med.mellekhatas !== "undefined") {
      const i = res.locals.med.mellekhatas.findIndex(
        (element) => element.tipus === req.body.type
      );
      if (i != -1) {
        switch (req.body.freq) {
          case "0":
            res.locals.med.mellekhatas[i].nagyonritka = undefined;
            break;
          case "1":
            res.locals.med.mellekhatas[i].ritka = undefined;
            break;
          case "2":
            res.locals.med.mellekhatas[i].nemgyakori = undefined;
            break;
          case "3":
            res.locals.med.mellekhatas[i].gyakori = undefined;
            break;
            case "4":
            res.locals.med.mellekhatas.pull(res.locals.med.mellekhatas[i]._id);
            break;
        }
    
      } else {
        res.locals.err = "Invalid data";
        return next();
      }
      if(typeof res.locals.med.mellekhatas[i].nagyonritka === 'undefined' && typeof res.locals.med.mellekhatas[i].ritka === 'undefined' && typeof res.locals.med.mellekhatas[i].nemgyakori === 'undefined' && typeof res.locals.med.mellekhatas[i].gyakori === 'undefined' ){
        res.locals.med.mellekhatas.pull(res.locals.med.mellekhatas[i]._id);
    }
    }
    

    res.locals.med.save((err) => {
     
      if (err) {
        return next(err);
      }

      return res.redirect("/medicine/found/" + res.locals.med._id);
    });
  };
};
