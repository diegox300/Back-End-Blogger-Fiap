export class InvalidCredentialsError extends Error {
  status: number

  constructor(message: string = 'Invalid email or password') {
    super(message)
    this.name = 'InvalidCredentialsError'
    this.status = 401
  }
}
