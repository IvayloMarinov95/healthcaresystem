const { Router } = require("express");
const { check } = require("express-validator");

const referralsController = require('../controllers/referrals-controller');

const router = Router();

router.get('/', referralsController.getReferrals);
router.get('/:uid', referralsController.getReferralsByUserId);
router.post('/createReferral',
    [
        check("patientPersonalId").not().isEmpty(),
        check("rhif").not().isEmpty(),
        check("healthDistrict").not().isEmpty(),
        check("idNumber").not().isEmpty(),
        check("countryCode").not().isEmpty(),
        check("dateOfBirth").not().isEmpty(),
        check("patientFullName").not().isEmpty(),
        check("medicalPlaceReferringRegNumber").not().isEmpty(),
        check("referringDoctorType").not().isEmpty(),
        check("referringSpecialtyCode").not().isEmpty(),
        check("referringDoctorFullName").not().isEmpty(),
        check("referralNumber").not().isEmpty(),
        check("primaryDiagnosis").not().isEmpty(),
        check("medicalPlaceRegNumber").not().isEmpty(),
        check("specialtyCode").not().isEmpty(),
        check("doctorPersonalId").not().isEmpty(),
        check("doctorFullName").not().isEmpty(),
        check("reason").not().isEmpty(),
    ],
    referralsController.createReferral);

router.patch('/:rid', referralsController.updateReferralStatus);
router.delete('/:rid', referralsController.deleteReferral);

module.exports = router;