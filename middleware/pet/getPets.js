/**
 * Load all pets from the database
 * The result is saved to res.locals.pets
 */
 const requireOption = require('../requireOption');

 module.exports = function (objectrepository) {
    const PetModel = requireOption(objectrepository, 'PetModel');
     return function (req, res, next) {
            
            const filters ={
                id: (req.query.chipnum === '') ? undefined : req.query.chipnum,
                nev: (req.query.name === '') ? undefined : req.query.name,
                faj: (req.query.species === '') ? undefined : req.query.species
            }
            if(typeof req.query.all !== 'undefined' && req.query.all !== '')
            {
                if(req.query.prop === '0' )
                filters.id = req.query.all;
            if(req.query.prop === '1' )
                filters.nev = req.query.all;
            if(req.query.prop === '2' )
               req.query.owner = req.query.all;
            if(req.query.prop === '3' )
                filters.faj = req.query.all;
            }
           
           
            PetModel.find({...filters}, (err,pets) =>{
                if(err){
                    return next(err);
                } 
                
                if(req.query.owner !== '' && typeof req.query.owner !== 'undefined')
                    pets = pets.filter(pet => (pet.tulaj.length >0 && pet.tulaj[pet.tulaj.length-1].nev === req.query.owner ));
                res.locals.pets = pets;
                res.locals.num = (typeof req.query.prop === 'undefined') ? 0 : req.query.prop;
                return next();
            }
            )
     };
 };
 