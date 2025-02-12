export type IncomeReturnObjectType = {
    error: boolean | string,
    category: null | IncomeResponseType[] | IncomeResponseType
}

export type IncomeResponseType = {
    id: number,
    title: string
}

export type IncomeCreateDataType = {
    title: string
}

export type IncomeCreateResponseType = {
    id: number,
    title: string
}