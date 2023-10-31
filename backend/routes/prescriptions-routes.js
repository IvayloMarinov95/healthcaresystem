const { Router } = require("express");

const prescriptionsController = require('../controllers/prescriptions-controller');

const router = Router();

router.get('/', prescriptionsController.getPrescriptions);
router.post('/createPrescription', prescriptionsController.createPrescription);
router.delete('/:pid', prescriptionsController.deletePrescription);

module.exports = router;