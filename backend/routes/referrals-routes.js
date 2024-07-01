const { Router } = require("express");
const { check } = require("express-validator");

const referralsController = require('../controllers/referrals-controller');

const router = Router();

router.get('/', referralsController.getReferrals);
router.get('/:uid', referralsController.getReferralsByUserId);
router.post('/createReferral', referralsController.createReferral);
router.patch('/:rid', referralsController.updateReferralStatus);
router.delete('/:rid', referralsController.deleteReferral);

module.exports = router;