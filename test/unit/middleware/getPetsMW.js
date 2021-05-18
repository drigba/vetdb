var expect = require('chai').expect;
var getPetsMW = require('../../../middleware/pet/getPets');
describe('getPetsMW middleware ', function () {
    it('should return pets', function (done) {
        var fakePetModel = {
            find:  (p1, cb) =>{
                expect(p1).to.be.contain({id : undefined});
                cb(null, ['pet1', 'pet2']);
            }
          };
          const req = {
              query:{
                  chipnum : '',
                  name : '',
                  species : '',
                  all : undefined,
                  prop : '0',
                  owner : ''
              }
          }
          var res= {
              locals :{}
          }
          getPetsMW({PetModel: fakePetModel})(req,res,function(err){
              expect(res.locals.pets).to.be.eql(['pet1', 'pet2']);
              done();
          })

    })

    it('should return when there is db problem ', function (done) {
        var fakePetModel = {
            find:  (p1, cb) =>{
                expect(p1).to.be.contain({id : 'alma'});
                cb('db error', null);
            }
          };
          const req = {
              query:{
                  chipnum : 'alma',
                  name : '',
                  species : '',
                  all : undefined,
                  prop : '0',
                  owner : ''
              }
          }
          var res= {
              locals :{}
          }
          getPetsMW({PetModel: fakePetModel})(req,res,function(err){
              expect(err).to.be.eql('db error')
              done();
          })

    })

    it('find param should equal nev if req.query.prop is 1', function (done) {
        var fakePetModel = {
            find:  (p1, cb) =>{
                expect(p1).to.contain({nev : 'Bloki'});
                cb(null, ['pet1', 'pet2']);
            }
          };
          const req = {
              query:{
                  chipnum : '',
                  name : '',
                  species : '',
                  all : 'Bloki',
                  prop : '1',
                  owner : ''
              }
          }
          var res= {
              locals :{}
          }
          getPetsMW({PetModel: fakePetModel})(req,res,function(err){
              done();
          })

    })


});