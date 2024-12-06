import { PostRepository } from '../../repositories/post.repository' // Importing the PostRepository for database operations

export class FindPostsByLetterUseCase {
  constructor(private postRepository: PostRepository) {} // Injecting the PostRepository dependency

  async handler(letter: string) {
    // Method to execute the retrieval of posts by letter
    const regex = new RegExp(`^${letter}`, 'i') // Create a regex to match posts starting with the letter
    const posts = await this.postRepository.find({ title: regex })
    return posts
  }
}
