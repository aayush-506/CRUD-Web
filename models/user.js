import { name } from 'ejs';
import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost:27017/testapp");

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    image:String
})

export default mongoose.model('user',userSchema);
