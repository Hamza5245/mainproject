const { checkToken } = require('../auth/token_validation')
const ratingController=require('../controllers/ratingController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',ratingController.getratings)
// router.get('/access/:id/:employId',ratingController.)
router.post('/create',ratingController.addrating)

router.get('/star/:bookId/:userId',ratingController.getbookratings)
router.get('/get/:id',ratingController.getratingById)
router.put('/update/:id',ratingController.updaterating)
router.delete('/delete/:id',ratingController.deleterating)


module.exports=router

