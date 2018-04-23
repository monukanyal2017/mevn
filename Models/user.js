var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserSchema=new Schema({
    Name:{type: String, index: true},
    email:{type: String, unique: true,index: true},
    password:{type: String, index: true},
    logintype:{type:String,index:true},
    folderwatchpath:{type:String,index:true},
   	createdAt: {type: Date, index: true,default: Date.now}
});
UserSchema.methods.checkPassword = function(password) {
	console.log(password);
	console.log(this.password);
    return (password === this.password);
};
module.exports=mongoose.model('User',UserSchema);

