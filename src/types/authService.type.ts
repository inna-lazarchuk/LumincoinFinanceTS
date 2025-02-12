export type AuthErrorType = {
    error: boolean,
    message: string,
    validation: [
        {
            key: string,
            message: string
        }
    ]
}

export type LoginDataType = {
    email: string | null,
    password: string | null,
    rememberMe?: boolean
}

export type LoginResponseType = {
    tokens: {
        accessToken: string,
        refreshToken: string
    },
    user: {
        name: string,
        lastName: string,
        id: number
    }
}

export type SignInBodyType = {
    name: string | null,
    lastName: string | null,
    email: string | null,
    password: string | null,
    passwordRepeat: string | null
}

export type SignInResponseType = {
    response: {
        user: {
            id: number,
            email: string,
            name: string,
            lastName: string
        }
    }
}

export type LogOutBodyType = {
    refreshToken: string;
}
