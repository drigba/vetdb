/**
 * Load a pet from the database using the :petid param
 * The result is saved to res.locals.pet
 */
 const requireOption = require('../requireOption');

 module.exports = function (objectrepository) {
    const PetModel = requireOption(objectrepository, 'PetModel');
     return function (req, res, next) {
        
     PetModel.findOne({_id: req.params.petid}, (err,pet) =>{
             if(!pet || err){
                 return next(err);
             }

          
                pet.populate('gyogyszerek.nev', (err,pet2 )=>{
                    res.locals.from = "Pet";
                    res.locals.pet = pet2;
                    return next();
                })
           

                
           
            
         });
        
       

         
     };
 };
 