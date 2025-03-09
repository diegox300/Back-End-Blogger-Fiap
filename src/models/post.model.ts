import { Schema, model, Document, Types } from 'mongoose' // Importing Schema, model, Document, and Types from mongoose
import { UserType } from './user.model' // Importing UserType from the user model

// Define the PostType interface that extends Document from mongoose
export interface PostType extends Document {
  _id: Types.ObjectId
  title: string // Title of the post
  content: string // Content of the post
  author: Types.ObjectId | UserType // Reference to the user who created the post
  img?: string // Optional image URL
  createdAt: Date // Creation date of the post
  updatedAt: Date // Last update date of the post
}

// Defining the schema for the Post model
const postSchema = new Schema<PostType>(
  {
    title: { type: String, required: true }, // Title field is a required string
    content: { type: String, required: true }, // Content field is a required string
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Author field is a required ObjectId that references the User model
    img: { type: String }, // Image field is an optional string
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
)

// Creating the Post model based on the schema
const Post = model<PostType>('Post', postSchema) // Defining the model with the name 'Post' and the schema

export default Post // Exporting the Post model for use in other modules
