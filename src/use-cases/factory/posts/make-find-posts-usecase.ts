import { PostRepository } from '../../../repositories/post.repository' // Importing the PostRepository for database operations
import { FindPostsCase } from '../../posts/find-posts-usecase' // Importing the FindPostsCase use case

export function makeFindPostsCase() {
  const postRepository = new PostRepository() // Creating an instance of PostRepository with the Post model
  const findPostRepository = new FindPostsCase(postRepository) // Creating an instance of FindPostsCase with the post repository
  return findPostRepository // Returning the instance of FindPostsCase
}
