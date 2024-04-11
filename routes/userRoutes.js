const express=require('express');
const {loginController,registerController,authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController}=require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

//router object
const router=express.Router();

//routes
//login||post
router.post('/login',loginController);

//register||post
router.post('/register',registerController);

//Auth||POST
router.post('/getUserData',authMiddleware, authController);

//Apply Doctor||POST
router.post('/apply-doctor',authMiddleware, applyDoctorController)

//Notification||POST
router.post('/get-all-notification',authMiddleware, getAllNotificationController)

//Notification||POST
router.post('/delete-all-notification',authMiddleware, deleteAllNotificationController)

//Get ALL DOC
router.get('/getAllDoctors',authMiddleware, getAllDoctorsController)

//BOOK APP
router.post('/book-appointment',authMiddleware, bookAppointmentController)

//BOOKING AVAIL
router.post('/booking-availability',authMiddleware, bookingAvailabilityController)

//appointment list
router.get('/user-appointments',authMiddleware,userAppointmentsController)
module.exports=router;