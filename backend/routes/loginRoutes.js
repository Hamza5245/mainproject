const { checkToken } = require('../auth/token_validation')
const loginController=require('../controllers/loginController')

const router=require('express').Router()

router.post('/user',loginController.loginuser)
router.get('/verify/:phone',loginController.verifyuser)
router.post('/seller',loginController.loginseller)
router.put('/update',loginController.updateuserloginPassword) 
router.put('/forgetUserPassword',loginController.forgetuserloginPassword)
router.put('/updateUserPassword',loginController.updateuserloginPassword)


module.exports=router

