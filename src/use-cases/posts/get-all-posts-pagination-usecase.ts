import { PostRepository } from '../../repositories/post.repository' // Importing the PostRepository for database operations
import { PostType } from '../../models/post.model' // Importing the PostDocument type

export class GetAllPostsPaginationUseCase {
  constructor(private postRepository: PostRepository) {} // Injecting the PostRepository dependency

  async execute(
    offset: number,
    limit: number,
  ): Promise<{ total: number; posts: PostType[] }> {
    return this.postRepository.getAllPostsPagination(offset, limit) // Calling the getAllPostsPagination method on the repository and returning the result
  }
}
