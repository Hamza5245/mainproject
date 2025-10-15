const { checkToken } = require('../auth/token_validation')
const walletController = require('../controllers/walletController')

const router = require('express').Router()

router.get('/get', walletController.getwallets)
router.post('/create', walletController.addwallet)

router.get('/get/:id', walletController.getwalletById)
router.get('/getBySeller/:sellerId', walletController.getwalletBySellerId)
router.put('/update/:id', walletController.updatewallet)
router.delete('/delete/:id', walletController.deletewallet)

router.post('/addFunds/:sellerId', walletController.addFunds)
router.post('/deductFunds/:sellerId', walletController.deductFunds)

// Seller wallet routes
router.get('/seller/:sellerId', walletController.getSellerWallet)

// Admin wallet routes
router.get('/admin/:adminId', walletController.getAdminWallet)
router.get('/admin/statistics', walletController.getWalletStatistics)
router.get('/admin/sellers', walletController.getAllSellersWallet)
router.post('/admin/deduct', walletController.deductFromSellerAddToAdmin)
router.post('/admin/commission', walletController.deductAdminCommission)
router.get('/admin/commission/transactions', walletController.getCommissionTransactions)

module.exports = router
