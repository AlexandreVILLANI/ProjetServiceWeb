//TODO
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({ //Collection
    googleId: String,
    displayName: String
});

mongoose.model("User", userSchema);