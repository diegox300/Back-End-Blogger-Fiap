import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User, { UserType } from '../models/user.model' // Importe o modelo User

interface CustomRequest extends Request {
  user?: UserType // Extende a interface Request com a propriedade user
}

// Middleware para verificar o token JWT
export const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload
    const user = await User.findById(id).exec()

    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    req.user = user
    next()
  } catch (error) {
    // Captura de erro
    return res.status(401).send({ message: 'Unauthorized' })
  }
}
