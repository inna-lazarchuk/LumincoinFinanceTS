export type AuthInfoType = {
    accessToken: string,
    refreshToken: string,
    userInfo: AuthInfoUserNameType
}

export type AuthInfoUserNameType = {
    name: string,
    id: number
}