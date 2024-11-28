import { PostRepository } from '../repositories/post.repository' // Importing the PostRepository for database operations

export class GetAllPostsPaginationUseCase {
  constructor(private postRepository: PostRepository) {} // Injecting the PostRepository dependency

  async execute(page: number = 1) {
    // Method to execute the retrieval of all posts with pagination
    const limit = 6 // Set the limit to 6 posts per page
    const offset = (page - 1) * limit // Calculate the offset for pagination
    return this.postRepository.getAllPostsPagination(offset, limit) // Calling the getAllPostsPagination method on the repository with pagination parameters
  }
}
