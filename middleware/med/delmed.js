/**
 * Removes a pet from the database, the entity used here is: res.locals.pet
 * Redirects to /pet/finder after delete
 */
 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
    return function(req, res, next) {

        if (typeof res.locals.med === 'undefined') {
            return next();
        }

        res.locals.med.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/medicine/found');
        });
    };
};