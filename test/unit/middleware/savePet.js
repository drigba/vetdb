var expect = require("chai").expect;
var SavePetMW = require("../../../middleware/pet/savePet");
describe("savePet middleware ", function () {
  it("should redirect to /pet/finder", function (done) {
    var fakePetModel = {
      findOne: (p1, cb) => {
        cb(null, null);
      },
    };
    const req = {
      body: {
        id: "a",
        nev: "a",
        kor: "a",
        tulaj: "a",
        faj: "a",
        tel: "a",
      },
    };
    var res = {
      locals: {
        pet: {
          tulaj: [{ tel: "blfblfb", nev: "ZSoma" }],
          save: (cb) => {
            cb(null);
          },
        },
        where: "not undef",
      },
      redirect: (where) => {
        expect(where).to.be.eql("/pet/finder");
        done();
      },
    };
    SavePetMW({ PetModel: fakePetModel })(req, res, function (err) {});
  });


  it("save should return error", function (done) {
    var fakePetModel = {
      findOne: (p1, cb) => {
        cb(null, null);
      },
    };
    const req = {
      body: {
        id: "a",
        nev: "a",
        kor: "a",
        tulaj: "a",
        faj: "a",
        tel: "a",
      },
    };
    var res = {
      locals: {
        pet: {
          tulaj: [{ tel: "blfblfb", nev: "ZSoma" }],
          save: (cb) => {
            cb('save error');
          },
        },
        where: "not undef",
      },
      redirect: (where) => {

      },
    };
    SavePetMW({ PetModel: fakePetModel })(req, res, function (err) {
        expect(err).to.be.eql('save error');
        done();
    });
  });

  it("should redirect to /pet/found/petid", function (done) {
    var fakePetModel = {
      findOne: (p1, cb) => {
        cb(null, null);
      },
    };
    const req = {
      body: {
        id: "a",
        nev: "a",
        kor: "a",
        tulaj: "Te",
        faj: "a",
        tel: "a",
      },
    };

    var res = {
      locals: {
        pet: {
          _id: "123",
          tulaj: [{ tel: "blfblfb", nev: "ZSoma" }],
          save: (cb) => {
            cb(null);
          },
        },
      },
      redirect: (where) => {
        expect(res.locals.pet.tulaj[0].nev).to.be.eql("Te");
        expect(where).to.be.eql("/pet/found/123");
        done();
      },
    };
    SavePetMW({ PetModel: fakePetModel })(req, res, function (err) {});
  });

  it("res.locals.err should equal Missing data!", function (done) {
    var fakePetModel = {
      findOne: (p1, cb) => {
        cb(null, null);
      },
    };
    const req = {
      body: {
        id: "a",
        nev: "a",
        kor: "a",
        tulaj: "Te",
        faj: "",
        tel: "a",
      },
    };

    var res = {
      locals: {
        pet: {
          _id: "123",
          tulaj: [{ tel: "blfblfb", nev: "ZSoma" }],
          save: (cb) => {
            cb(null);
          },
        },
      },
      redirect: (where) => {
      },
    };
    SavePetMW({ PetModel: fakePetModel })(req, res, function (err) {
      expect(res.locals.err).to.be.eql("Missing data!");
      done();
    });
  });

  it("res.locals.err should equal Existing ID!", function (done) {
    var fakePetModel = {
      findOne: (p1, cb) => {
        cb(null, {_id:'0'});
      },
    };
    const req = {
      body: {
        id: "a",
        nev: "a",
        kor: "a",
        tulaj: "Te",
        faj: "a",
        tel: "a",
      },
    };

    var res = {
      locals: {
        pet: {
          _id: "123",
          tulaj: [{ tel: "blfblfb", nev: "ZSoma" }],
          save: (cb) => {
            cb(null);
          },
        },
      },
      redirect: (where) => {

      },
    };
    SavePetMW({ PetModel: fakePetModel })(req, res, function (err) {
      expect(res.locals.err).to.be.eql("Existing ID");
      done();
    });
  });

  it("res.locals.err should create new pet!", function (done) {
    class PetMOckMOdell {
      constructor() {
        this.tulaj = [];
      }
      save(cb) {
        cb(null);
      }
      static findOne(p1, cb) {
        cb(null, null);
      }
    }

    const req = {
      body: {
        id: "a",
        nev: "a",
        kor: "a",
        tulaj: "Te",
        faj: "a",
        tel: "a",
      },
    };

    var res = {
      locals: {},
      redirect: (where) => {
        expect(where).to.be.eql("/pet/finder");
        expect(res.locals.pet.tulaj[0].nev).to.be.eql("Te");
        done();
      },
    };
    SavePetMW({ PetModel: PetMOckMOdell })(req, res, function (err) {});
  });

  it("res.locals.err should equal Existing ID2!", function (done) {
    class PetMOckMOdell {
        constructor() {
          this.tulaj = [];
          this.id = '1234';
        }
        save(cb) {
          cb(null);
        }
        static findOne(p1, cb) {
          cb(null, {_id:'0'});
        }
      }
    var fakePetModel = {
      findOne: (p1, cb) => {
        cb(null, "alma");
      },
    };
    const req = {
      body: {
        id: "a",
        nev: "a",
        kor: "a",
        tulaj: "Te",
        faj: "a",
        tel: "a",
      },
    };

    var res = {
      locals: {
          pet:undefined
      },
      redirect: (where) => {
      },
    };
    SavePetMW({ PetModel: PetMOckMOdell })(req, res, function (err) {
        expect(res.locals.where).to.be.eql('add');
      expect(res.locals.err).to.be.eql("Existing ID");
      done();
    });
  });

  it("res.locals.pet should be undefined", function (done) {
    var fakePetModel = {
      findOne: (p1, cb) => {
        cb(null, null);
      },
    };
    const req = {
      body: {
        id: undefined,
        nev: "a",
        kor: "a",
        tulaj: "a",
        faj: "a",
        tel: "a",
      },
    };
    var res = {
      locals: {
        where: "not undef",
      },
      redirect: (where) => {

      },
    };
    SavePetMW({ PetModel: fakePetModel })(req, res, function (err) {
        expect(res.locals.pet).to.be.an('undefined');
        done();
    });
  });

  
});
