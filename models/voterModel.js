const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

const voterSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    aadharNumber:{
        type:Number,
        required:true,
        unique:true
    },
    isVoted:{
        type:Boolean,
        default:false
    },
    password:{
        type:String, 
        required:true
    },
    mobile:{
        type:String,
        required:true,
    },
    email:{
        type:String
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter'
    }  
});

voterSchema.pre('save',async function(next){
    const voter= this;
    try{
        if(voter.isModified('password')){
            const salt = await bcrypt.genSalt(6);
            const hashedPassword= await bcrypt.hash(voter.password,salt);
            voter.password= hashedPassword;
            next();
        }
    }catch(err){
        return next(err);
    }

});

voterSchema.methods.comparePassword= async function(candidatePassword){
    try{
        const isMatch= await bcrypt.compare(candidatePassword,this.password);
        return isMatch
    }
    catch(err){
        throw err;
    }
}

const voterModel= mongoose.model('Voter',voterSchema);

module.exports=voterModel;