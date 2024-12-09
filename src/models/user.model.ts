import { Schema, model, Document, ObjectId } from 'mongoose' // Importing Schema, model, and Document from mongoose

// Define the UserType interface that extends Document from mongoose
export interface UserType extends Document {
  _id: ObjectId
  name: string // Name of the user
  email: string // Email of the user
  password: string // Password of the user
  posts: ObjectId[] // List of posts created by the user
  isAdmin: boolean // Whether the user is an admin
  createdAt: Date // Creation date of the user
  updatedAt: Date // Last update date of the user
}

// Defining the schema for the User model
const userSchema = new Schema<UserType>(
  {
    name: { type: String, required: true }, // Name field is a required string
    email: { type: String, required: true, unique: true }, // Email field is a required string and must be unique
    password: { type: String, required: true }, // Password field is a required string
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // Posts field is an array of ObjectIds that reference the Post model
    isAdmin: { type: Boolean, default: true }, // isAdmin field is a boolean with a default value of false
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
)

// Creating the User model based on the schema
const User = model<UserType>('User', userSchema) // Defining the model with the name 'User' and the schema

export default User // Exporting the User model for use in other modules
