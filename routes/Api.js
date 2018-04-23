const express = require('express');
const router = express.Router();
var Book=require('../Models/Book.js'); //including model
var VerifyToken = require('../verifytoken'); //api middleware

router.post('/login',function(req,res){
   var pwd=md5(req.body.password);
     var query=User.findOne({ email:req.body.username});
     query.exec().then((userdata)=>{
            if (userdata) {
          
          
                   if (userdata.checkPassword(pwd)){
                  
                      console.log('password are equal');
                      var token = jwt.sign({ id: userdata._id },'supersecret', {
                        expiresIn: 86400 // expires in 24 hours
                      });
                       var obj={};
                       obj._id=userdata._id;
                       obj.Name=userdata.Name;
                       obj.email=userdata.email;
                       res.status(200).json({ auth:true,result:obj ,token:token, token_expire_on:'86400' });
                  }
                  else
                  {
                       res.status(201).json({ auth:false,result:'' });
                  } 

        }
        else
        {
            res.status(201).json({ auth:false,result: userdata });
          
        }
      

     }).catch((err)=>{

      res.status(400).json({ error: err });

     });
    
});

router.get('/books',VerifyToken,function(req,res){
	//req.userId
	
	Book.find({}).exec().then((results)=>{
		res.status(200).json({ data: results });
	}).catch((err)=>{
		res.status(400).json({ error: err });
	});
});


router.post('/books',function(req,res){

	var newBook=new Book();
	newBook.Title=req.body.Title;
	newBook.Author=req.body.Author;
	newBook.Category=req.body.Category;
	newBook.save().then((results)=>{
		res.status(200).json({ data: results });
	}).catch((err)=>{
		res.status(400).json({ error: err });
	});
});


router.get('/:id',function(req,res){

	Book.find({_id:req.params.id}).exec().then((results)=>{
		res.status(200).json({ data: results });
	}).catch((err)=>{
			res.status(400).json({ error: err });
	});
});


router.put('/:id',function(req,res){
	  var query = Book.findOneAndUpdate({_id:req.params.id},{$set: {Title:req.body.Title}},{upsert:true});
		 query.exec().then((results)=> {
	     	res.status(200).json({ status:'success',data: results });
	    }).catch((err)=>{

	    	res.status(400).json({ status:'error',data: err });
	    });
	
});


router.delete('/:id',function(req,res){
	
	var query=Book.findOneAndRemove({_id:req.params.id});
	query.exec().then((results)=>{
		res.status(200).json({ data: results });
	}).catch((err)=>{
		res.status(400).json({ error: err });
	});
	
});


module.exports = router;