const { checkToken } = require('../auth/token_validation')
const countryController=require('../controllers/countryController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',countryController.getcountrys)
// router.get('/access/:id/:employId',countryController.)
router.post('/create',countryController.addcountry)

router.get('/get/:id',countryController.getcountryById)
router.put('/update/:id',countryController.updatecountry)
router.delete('/delete/:id',countryController.deletecountry)


module.exports=router

