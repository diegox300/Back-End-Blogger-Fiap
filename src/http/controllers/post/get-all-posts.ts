import { Request, Response, NextFunction } from 'express'
import { makeGetAllPostsUseCase } from '../../../use-cases/factory/posts/make-get-all-posts-usecase'
import { UserType } from '../../../models/user.model'

// Get all posts
export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const getAllPostsUseCase = makeGetAllPostsUseCase()

  getAllPostsUseCase
    .execute()
    .then((posts) => {
      const postsWithAuthor = posts.map((post) => ({
        ...post,
        author: (post.author as UserType).name, // Replace the author ID with the author's name
      }))
      res.status(200).send(postsWithAuthor)
    })
    .catch(next) // Pass the error to the error handling middleware
}
