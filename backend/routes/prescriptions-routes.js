const { Router } = require("express");

const prescriptionsController = require('../controllers/prescriptions-controller');

const router = Router();

router.get('/', prescriptionsController.getPrescriptions);
router.get('/getMedicineList', prescriptionsController.getMedicineList);
router.get('/getDiseases', prescriptionsController.getDiseases);
router.get('/getFiveMostFrequentMedications', prescriptionsController.getFiveMostFrequentMedications);
router.get('/getFiveMostFrequentDiseases', prescriptionsController.getFiveMostFrequentDiseases);
router.get('/:uid', prescriptionsController.getPrescriptionsByUserId);
router.post('/createPrescription', prescriptionsController.createPrescription);
router.patch('/:pid', prescriptionsController.updatePrescriptionStatus);
router.delete('/:pid', prescriptionsController.deletePrescription);

module.exports = router;