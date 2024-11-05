export interface IAuthMe {
    id: string
    username: string
}

export interface IAuthRegister {
    message: string
    error: string
    statusCode: number
}