import mongoose from "mongoose";
import { isGoodPassword } from "../utils/validators.js";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    //username: { type: String, required: true, unique: true, maxLength: 20, minlegth: 3,    trim: true, lowercase: true },
    email: { type: String, required: true, maxLength: 30, minlength: 3, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true, validate: {validator: function (password) {return isGoodPassword(password)}, message: "Password must have between 6 and 12 characters (1 number, 1 capital letter and 1 lowercase letter)"} },
},
{timestamps: true}); 

//Encripto antes de guardar el password 
userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();

});

export default mongoose.model('User', userSchema);

