/**
 * Created by Administrator on 2015/5/9.
 */
var express = require('express');
var router = express.Router();
var site = require('./controller/site');
var filter = require('./controller/filter');
var user = require('./controller/user');


router.get('/reg',filter.checkNotLogin);
router.post('/reg',filter.checkNotLogin);
router.get('/login',filter.checkNotLogin);
router.post('/login',filter.checkNotLogin);
router.get('/logout',filter.checkLogin);
router.get('/uploadPhoto',filter.checkLogin);
router.post('/uploadPhoto',filter.checkLogin);
router.post('/addPhoto',filter.checkLogin);

router.get('/',site.index);
router.get('/reg',user.showReg);
router.post('/reg',user.reg);
router.get('/login',user.showLogin);
router.post('/login',user.login);
router.get('/logout',user.logout);
router.get('/uploadPhoto',site.showUploadPhoto);
router.post('/uploadPhoto',site.uploadPhoto);
router.post('/addPhoto',site.addPhoto);
router.get('/new',site.index);
router.get('/new/:pageNum',site.indexPagination);

module.exports=router;