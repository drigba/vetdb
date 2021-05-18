const renderMW = require('../middleware/render');
const delPetMW = require('../middleware/pet/delPet');
const getPetsMW = require('../middleware/pet/getPets');
const getPetMW = require('../middleware/pet/getPet');
const addMedToPetMW = require('../middleware/pet/addmedtopet');
const savePetMW = require("../middleware/pet/savePet");
const getMedsMW = require('../middleware/med/getMeds');
const getMedMW = require('../middleware/med/getMed');
const addowner = require('../middleware/pet/addownertopet')
const saveMedMW = require('../middleware/med/saveMed');
const addtreatMW = require('../middleware/med/addtreat');
const poptreatMW = require('../middleware/med/poptreat');
const dosageMW = require('../middleware/med/dosage');
const addudeMW = require('../middleware/med/addude');
const deludeMW =require('../middleware/med/delude');
const delmedMW =require('../middleware/med/delmed');
const PetModel = require('../models/pet');
const MedicineModel = require('../models/medicine');


module.exports = function (app) {
    const objRepo = {
        PetModel : PetModel,
        MedicineModel: MedicineModel
    };

    app.use('/pet/finder/add',
    savePetMW(objRepo),
    renderMW(objRepo, 'addpatient'));

    app.get('/pet/found',
        getPetsMW(objRepo),
        renderMW(objRepo, 'pettable'));

    app.get('/',
        renderMW(objRepo, 'index'));

    app.use('/pet/finder',
        renderMW(objRepo, 'petfinder'));
    
    app.get('/pet/found/:petid/medicine/:medid',
        getPetMW(objRepo),
        getMedMW(objRepo),
        renderMW(objRepo, 'medicine'));

    app.use('/pet/found/:petid/addmed',
        getPetMW(objRepo),
        addMedToPetMW(objRepo),
        renderMW(objRepo, 'add'));

    app.get('/pet/found/:petid',
        getPetMW(objRepo),
        renderMW(objRepo, 'pet'));
  
     app.use('/pet/found/:petid/addowner',
        getPetMW(objRepo),
        addowner(objRepo),
        renderMW(objRepo, 'newowner'));

    app.use('/pet/found/:petid/edit',
        getPetMW(objRepo),
        savePetMW(objRepo),
        renderMW(objRepo, 'addpatient'));
    
    app.get('/pet/found/:petid/del',
        getPetMW(objRepo),
        delPetMW(objRepo));

    app.get('/medicine/found/:medid',
        getMedMW(objRepo),
        renderMW(objRepo, 'medicine'));

    app.use('/medicine/found/:medid/edit',
        getMedMW(objRepo),
        saveMedMW(objRepo),
        renderMW(objRepo, 'addmed'));
        
    app.get('/medicine/finder',
        renderMW(objRepo, 'medfinder'));
    
    app.use('/medicine/finder/add',
        saveMedMW(objRepo),
        renderMW(objRepo, 'addmed'));
    
    app.get('/medicine/found',
        getMedsMW(objRepo),
        renderMW(objRepo, 'medicinetable'));
     
    app.use('/medicine/found/:medid/addtreat',
        getMedMW(objRepo),
        addtreatMW(objRepo),
        renderMW(objRepo, 'addtreat'));

        app.use('/medicine/found/:medid/poptreat',
        getMedMW(objRepo),
        poptreatMW(objRepo),
       );
    app.use('/medicine/found/:medid/dosage',
       getMedMW(objRepo),
       dosageMW(objRepo),
       renderMW(objRepo,'dosage')
      );

      app.use('/medicine/found/:medid/addude',
      getMedMW(objRepo),
        addudeMW(objRepo),
       renderMW(objRepo,'addude')
      );
      app.use('/medicine/found/:medid/delude',
      getMedMW(objRepo),
        deludeMW(objRepo),
       renderMW(objRepo,'delude')
      );

      app.use('/medicine/found/:medid/delete',
      getMedMW(objRepo),
        delmedMW(objRepo)
      );
    

};
