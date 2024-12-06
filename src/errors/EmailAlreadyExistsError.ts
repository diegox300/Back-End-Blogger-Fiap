export class EmailAlreadyExistsError extends Error {
  status: number

  constructor(message: string = 'Email already exists') {
    super(message)
    this.name = 'EmailAlreadyExistsError'
    this.status = 409
  }
}
