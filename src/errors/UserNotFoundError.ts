export class UserNotFoundError extends Error {
  status: number

  constructor(message: string = 'User not found') {
    super(message)
    this.name = 'UserNotFoundError'
    this.status = 404
  }
}
