import { PostRepository } from '../../../repositories/post.repository'
import { FindPostsByLetterUseCase } from '../../posts/find-posts-by-letter-usecase' // Importing the FindPostsByLetterUseCase

export const makeFindPostsByLetterUseCase = () => {
  const postRepository = new PostRepository() // Pass the Post model to the PostRepository
  return new FindPostsByLetterUseCase(postRepository)
}
