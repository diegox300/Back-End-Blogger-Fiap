import { PostRepository } from '../../repositories/post.repository' // Importing the PostRepository for database operations

export class GetAllPostsPaginationUseCase {
  constructor(private postRepository: PostRepository) {} // Injecting the PostRepository dependency

  async execute(offset: number, limit: number) {
    // Method to execute the retrieval of all posts with pagination
    return this.postRepository.getAllPostsPagination(offset, limit) // Calling the getAllPostsPagination method on the repository and returning the result
  }
}
