import { Types } from 'mongoose'
import Post, { PostType } from '../models/post.model' // Importing the Post model and PostType interface

export class PostRepository {
  // Asynchronous method to create a new post
  async createPost(post: {
    title: string
    content: string
    img?: string
    author: Types.ObjectId
  }): Promise<PostType> {
    // Create a new instance of the Post model with the provided data
    const newPost = new Post(post)

    // Save the new post to the database
    await newPost.save()

    // Populate the author field
    await newPost.populate('author')

    // Return the new post as PostType
    return newPost as PostType
  }

  // Method to get all posts
  public async getAllPosts(): Promise<PostType[]> {
    const posts = await Post.find().populate('author').exec()
    return posts.map((post) => post.toObject() as PostType)
  }

  // Method to find a post by its ID
  public async getPostById(id: string): Promise<PostType | null> {
    // Find a post by its ID and populate the author field
    const postById = await Post.findById(id).populate('author').exec()

    // Return the found post or null if not found
    return postById ? (postById.toObject() as PostType) : null
  }

  // Method to find posts by query
  public async find(query: any): Promise<PostType[]> {
    const posts = await Post.find(query).exec()
    return posts.map((post) => post.toObject() as PostType)
  }

  // Method to find posts by user ID
  async findPostsByUserId(userId: string): Promise<PostType[]> {
    // Find posts by user ID
    const posts = await Post.find({ author: userId }).exec()
    return posts.map((post) => post.toObject() as PostType)
  }

  // Method to get all posts with pagination
  public async getAllPostsPagination(offset: number, limit: number) {
    const posts = await Post.find()
      .skip(offset)
      .limit(limit)
      .populate('author')
      .exec()
    const total = await Post.countDocuments()
    return { posts: posts.map((post) => post.toObject() as PostType), total }
  }

  // Method to find a post by its ID
  async findById(id: string): Promise<PostType | null> {
    // Encontrar o post pelo ID e popular o campo 'author'
    const post = await Post.findById(id).populate('author').exec() // Use o populate aqui

    // Retorna o post populado ou null se não encontrado
    return post ? (post.toObject() as PostType) : null
  }

  // Method to delete a post by its ID
  public async deletePostById(id: string): Promise<PostType | null> {
    // Delete a post by its ID
    const deletedPost = await Post.findByIdAndDelete(id)

    // Return the deleted post or null if not found
    return deletedPost ? (deletedPost.toObject() as PostType) : null
  }

  // Method to update a post by its ID
  public async updatePostById(
    id: string,
    updateData: Partial<PostType>,
  ): Promise<PostType | null> {
    // Update a post by its ID
    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
      new: true,
    })

    // Return the updated post or null if not found
    return updatedPost ? (updatedPost.toObject() as PostType) : null
  }
}
