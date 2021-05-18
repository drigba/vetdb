/**
 * Using POST params update or save a pet to the database
 * If res.locals.pet is there, it's an update otherwise this middleware creates an entity
 * Redirects to /pet/found/:petid after success
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const PetModel = requireOption(objectrepository, "PetModel");
  return function (req, res, next) {
    let n = false;
    if (
      typeof req.body.nev === "undefined" ||
      typeof req.body.id === "undefined" ||
      typeof req.body.kor === "undefined" ||
      typeof req.body.tulaj === "undefined" ||
      typeof req.body.faj === "undefined" ||
      typeof req.body.tel === "undefined"
    ) {
      return next();
    }
    if (
      req.body.nev === "" ||
      req.body.id === "" ||
      req.body.kor === "" ||
      req.body.tulaj === "" ||
      req.body.faj === "" ||
      req.body.tel === ""
    ) {
      res.locals.err = "Missing data!";
      return next();
    }
    if (typeof res.locals.pet === "undefined") {
      n = true;

      res.locals.pet = new PetModel();
    }

    let today = new Date();
    res.locals.pet.nev = req.body.nev;
    res.locals.pet.id = req.body.id;
    res.locals.pet.szuletes = req.body.kor;
    res.locals.pet.faj = req.body.faj;
    if(n){
        res.locals.pet.tulaj.push({
            tel: req.body.tel,
            nev: req.body.tulaj,
            from:
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate(),
          });
    }
    else{
        res.locals.pet.tulaj[res.locals.pet.tulaj.length-1].tel = req.body.tel;
        res.locals.pet.tulaj[res.locals.pet.tulaj.length-1].nev = req.body.tulaj;
    }
    
    PetModel.findOne({ id: req.body.id }, (err, pet) => {

      if (pet) {
        if (String(pet._id)  != String(res.locals.pet._id) ) {

          res.locals.err = "Existing ID";
          if (n){
            res.locals.where = "add";

          } 
          return next();
        }
      }

      res.locals.pet.save((err) => {
        if (err) {
          return next(err);
        }
        if (n || typeof res.locals.where !== "undefined") {
          return res.redirect("/pet/finder");
        }
        else {
          return res.redirect("/pet/found/" + res.locals.pet._id);
        }
      });
    });
  };
};
