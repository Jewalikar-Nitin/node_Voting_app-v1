const mongoose= require('mongoose');

const candidateSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    party:{
        type:String,
        required:true
    },
    votes:[
        { 
            voters:{
             type:mongoose.Schema.Type.ObjectId,
             ref:'Voter',
             required:true,
            },
            votedAt:{
                type:Date,
                default:Date.now()
            }
        }
     ],
    voteCount:{
        type:Number,
        default:0
    }
});

const candidateModel = new mongoose.model('Candidate',candidateSchema);
module.exports=candidateModel;