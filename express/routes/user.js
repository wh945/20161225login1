var express = require('express');
var session = require('express-session');
var fs = require('fs');
var router = express.Router();
router.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zfpx'
}));


var arr = [];
var arr1 = [];
//注册
router.get('/signup',function(req,res){
  res.render('signup',{title:'用户注册',error:req.session.error,success:''});

});

router.post('/signup',function(req,res){
     var user = req.body;
    var name1 = user.username;
    var pass = user.password;
    var obj={};
     obj[name1] = pass;
    if (req.session[user.username]){
        req.session.error = 'chongfu';
        res.redirect('/user/signup');

    }
    arr1.push(obj);
    fs.readFile('./e.json',function (err,data) {
       if (err) console.log(err);
        try {
           data = JSON.parse(data);//
            data.push(obj);
            console.log(data);
            fs.writeFile('./e.json',JSON.stringify(data),function (err) {

            });
        }catch (e){
            data = [];
        }
    });

    req.session[user.username] = user.password;
   /* req.session.password = user.password;*/
    res.redirect('/user/signin');
});
//登录
router.get('/signin',function(req,res){
    res.render('signin',{title:'用户登录'});
});
router.post('/signin',function(req,res){
  var user = req.body;
    if (req.session[user.username] == user.password){
        arr = [user.username];
        req.session.success = 'success';
        res.redirect('/user/welcome');
    }else {
        res.redirect('/user/signin');
    }

});
//欢迎页
router.get('/welcome',function(req,res){
    res.render('welcome',{title:'欢迎页',username:arr[0],success:req.session.success,error:''});
});
module.exports = router;