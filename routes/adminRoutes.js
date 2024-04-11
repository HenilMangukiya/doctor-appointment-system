const express=require('express')
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminCtrl');

const router=express.Router();
//GET MMETHOD||USERS
router.get('/getAllUsers',authMiddleware,getAllUsersController)

//GET METHOD||DOCTOR
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)

//POST ACCOUNT STATUS
router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController)
module.exports=router;