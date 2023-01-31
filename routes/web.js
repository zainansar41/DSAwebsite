const express=require('express')
const router=express.Router();

const authcon=require("../controllers/authcon.js");
const {viewContent}= require('../controllers/viewContent.js');
const webscon= require("../controllers/websitecon.js")
const requireAuth=require('../middleware/authmiddleware.js')


router.get('/',webscon.index_get)
router.get('/ds',webscon.DS_get)
router.get('/algo',webscon.algo_get)
router.get('/query',requireAuth,webscon.query_get)
router.post('/query',webscon.query_post)
router.post('/search',webscon.search_post)
router.get('/start',webscon.start_get) 
router.get('/signup',authcon.sinup_get)
router.get('/login',authcon.login_get)
router.post('/signup',authcon.sinup_post)
router.post('/login',authcon.login_post)
router.get('/viewCon/:idtopic',viewContent) 

module.exports=router;