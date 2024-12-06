import { PostRepository } from '../../../repositories/post.repository'
import { GetAllPostsPaginationUseCase } from '../../posts/get-all-posts-pagination-usecase'

export const makeGetAllPostsPaginationUseCase = () => {
  const postRepository = new PostRepository() // Pass the postModel to the PostRepository
  return new GetAllPostsPaginationUseCase(postRepository)
}
