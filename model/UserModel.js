import mongoose from 'mongoose';



var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {
        type: Number,

    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
    mobile: {
        type: String,
        required: true
    }
    
},{timestamps:true});

mongoose.models = {};


var User = mongoose.model('users', userSchema);

export default User;