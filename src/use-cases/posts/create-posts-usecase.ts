import { Types } from 'mongoose' // Importing Types from mongoose
import { PostRepository } from '../../repositories/post.repository' // Importing the PostRepository for database operations
import { UserRepository } from '../../repositories/user.repository' // Importing the UserRepository for database operations

export class CreatePostUseCase {
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository,
  ) {} // Injecting the PostRepository and UserRepository dependencies

  async handler(data: {
    title: string
    content: string
    img?: string
    author: Types.ObjectId
  }) {
    // Method to execute the creation of a post
    const post = await this.postRepository.createPost(data)

    // Add the post to the user's list of posts
    await this.userRepository.addPostToUser(data.author, post._id)

    return post
  }
}
