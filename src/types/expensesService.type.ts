export type ExpenseReturnObjectType = {
    error: boolean | string,
    category: null | ExpenseResponseType[] | ExpenseResponseType
}

export type ExpenseResponseType = {
    id: number,
    title: string
}

export type ExpenseCreateDataType = {
    title: string
}
