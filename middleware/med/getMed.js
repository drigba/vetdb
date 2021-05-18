/**
 * Load a medicine from the database using the :medid param
 * The result is saved to res.locals.medicine
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const MedicineModel = requireOption(objectrepository, "MedicineModel");
  return function (req, res, next) {
      if(typeof req.params.petid !== 'undefined')
        res.locals.from = "pet";
    MedicineModel.findOne({ _id: req.params.medid }, (err, med) => {
      if (!med || err) {
        return next(err);
      }
      res.locals.med = med;

      return next();
    });
  };
};
