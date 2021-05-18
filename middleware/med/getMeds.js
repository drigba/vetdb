/**
 * Load all medicine from the database
 * The result is saved to res.locals.medicines
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const MedicineModel = requireOption(objectrepository, "MedicineModel");
  return function (req, res, next) {
    const filters = {
      hatoanyag: req.query.as === "" ? undefined : req.query.as,
      nev: req.query.name === "" ? undefined : req.query.name,
      veny:
        (req.query.pres === "" || req.query.pres === "0" || typeof req.query.pres === "undefined")
          ? undefined
          : req.query.pres === "1"
          ? true
          : false,
    };
    res.locals.numdos = (typeof req.query.pres === 'undefined') ? 0 : req.query.pres;
    if (typeof req.query.all !== "undefined" && req.query.all !== "") {
      if (req.query.prop === "0") filters.hatoanyag = req.query.all;
      if (req.query.prop === "1") filters.nev = req.query.all;
      
    }
    res.locals.numuno= (typeof req.query.prop === 'undefined') ? 0 : req.query.prop;
    MedicineModel.find({ ...filters }, (err, meds) => {
      if (err) return next(err);

      res.locals.medicines = meds;
      return next();
    });
  };
};
