const { Router } = require("express");

const prescriptionsController = require('../controllers/prescriptions-controller');

const router = Router();

router.get('/', prescriptionsController.getPrescriptions);
router.get('/:uid', prescriptionsController.getPrescriptionsByUserId);
router.post('/createPrescription', prescriptionsController.createPrescription);
router.patch('/:pid', prescriptionsController.updatePrescriptionStatus);
router.delete('/:pid', prescriptionsController.deletePrescription);

module.exports = router;