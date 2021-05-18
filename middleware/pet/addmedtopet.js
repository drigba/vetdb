/**
 * Using POST params adds a medicine to a pet
 * Redirects to /pet/found/:petid after success
 */

const requireOption = require('../requireOption');
const moment = require("moment");
module.exports = function (objectrepository) {
    const PetModel = requireOption(objectrepository, 'PetModel');
    const MedModel = requireOption(objectrepository,'MedicineModel');
    return function (req, res, next) {

        if (
            typeof req.body.date === 'undefined' ||
            typeof req.body.med === 'undefined' 
        ) {
            return next();
        }
        if( req.body.date === '')
        {
            res.locals.err = "Missing date";
            return next();
        }
        const today = moment().format("YYYY-MM-DD");
        const dob = moment(res.locals.pet.szuletes).format("YYYY-MM-DD");
        if(today< req.body.date || req.body.date < dob)
        {
            res.locals.err = "Invalid date";
      return next();
        }
        MedModel.findOne({nev:req.body.med}, (err,med) =>{
            
            if(!med || err){
                res.locals.err = "Invalid data";
                 return next(err);
             }
             const m = {
                 nev: med,
                 datum: req.body.date
             }
             
             res.locals.pet.gyogyszerek.push(m);
             res.locals.pet.save(err => {
                if (err) {
                    return next(err);
                }
                
                return res.redirect('/pet/found/'+res.locals.pet._id);
            });
        })
       // return next();
       // return res.redirect('/pet/found/'+res.locals.pet._id);
        
    };
};