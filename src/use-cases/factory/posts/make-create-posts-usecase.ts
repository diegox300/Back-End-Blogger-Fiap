import { PostRepository } from '../../../repositories/post.repository' // Importing the PostRepository for database operations
import { UserRepository } from '../../../repositories/user.repository' // Importing the UserRepository for database operations
import { CreatePostUseCase } from '../../posts/create-posts-usecase' // Importing the CreatePostUseCase

export function makeCreatePostUseCase() {
  const postRepository = new PostRepository() // Creating an instance of PostRepository
  const userRepository = new UserRepository() // Creating an instance of UserRepository
  const createPostUseCase = new CreatePostUseCase(
    postRepository,
    userRepository,
  ) // Creating an instance of CreatePostUseCase with the post and user repositories
  return createPostUseCase // Returning the instance of CreatePostUseCase
}
