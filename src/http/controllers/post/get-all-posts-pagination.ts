import { Request, Response, NextFunction } from 'express'
import { makeGetAllPostsPaginationUseCase } from '../../../use-cases/factory/posts/make-get-all-posts-pagination-usecase'

// Get all posts with pagination
export const getAllPostsPagination = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const getAllPostsPaginationUseCase = makeGetAllPostsPaginationUseCase()

  const page = parseInt(req.query.page as string) || 1 // Get the page number from query parameters, default to 1 if not provided

  getAllPostsPaginationUseCase
    .execute(page)
    .then((result) => res.status(200).send(result))
    .catch(next) // Pass the error to the error handling middleware
}
