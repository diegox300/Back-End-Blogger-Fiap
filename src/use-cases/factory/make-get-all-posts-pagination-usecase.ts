import { PostRepository } from '../../repositories/post.repository'
import { GetAllPostsPaginationUseCase } from '../get-all-posts-pagination-usecase'

export const makeGetAllPostsPaginationUseCase = () => {
  const postRepository = new PostRepository() // Pass the postModel to the PostRepository
  return new GetAllPostsPaginationUseCase(postRepository)
}
