const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const MedicineModel = requireOption(objectrepository, "MedicineModel");
  return function (req, res, next) {
    let n = false;
    if (
      typeof req.body.nev === "undefined" ||
      typeof req.body.bevitel === "undefined" ||
      typeof req.body.csomag === "undefined" ||
      typeof req.body.erosseg === "undefined" ||
      typeof req.body.hatoanyag === "undefined" ||
      typeof req.body.pres === "undefined"
    ) {
      return next();
    }
    if (
      req.body.nev === "" ||
      req.body.bevitel === "" ||
      req.body.hatoanyag === "" ||
      req.body.csomag === "" ||
      req.body.erosseg === "" ||
      req.body.pres === ""
    ) {
      res.locals.err = "Missing data!";
      return next();
    }
    if (typeof res.locals.med === "undefined") {
      n = true;
      res.locals.med = new MedicineModel();
    }
    res.locals.med.nev = req.body.nev;
    res.locals.med.bevitel = req.body.bevitel;
    res.locals.med.hatoanyag = req.body.hatoanyag;
    res.locals.med.veny = req.body.pres === "0" ? true : false;
    if (!isNaN(req.body.csomag) && !isNaN(req.body.erosseg)) {
      res.locals.med.csomag = Number(req.body.csomag);
      res.locals.med.erosseg = Number(req.body.erosseg);
    } else {
      res.locals.err = "Invalid data";
      if (n) res.locals.where = "Add";
      return next();
    }
    MedicineModel.findOne({ nev: req.body.nev }, (err, med) => {
      if (med) {
        if (String(med._id) != String(res.locals.med._id)) {
          res.locals.err = "Existing ID";
          if (n) res.locals.where = "add";
          return next();
        }
      }
      res.locals.med.save((err) => {
        if (err) {
          return next(err);
        }
        if (n) return res.redirect("/medicine/finder");
        return res.redirect("/medicine/found/" + res.locals.med._id);
      });
    });
  };
};
