import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        // unique: [true, 'Username already exists!'],
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Invalid username, it should contain 8-20 alpha-numeric letters and be unique!"]
    },
    image: {
        type: String
    }
})

const User = models.User || model("User", UserSchema)

export default User