export type CategoryExpenseResultResponseType = {
    error: boolean,
    response: ExpenseCategoryType
}

export type ExpenseReturnObjectType = {
    error: boolean | string,
    category: ExpenseCategoryType[] | ExpenseCategoryType
}

export type ExpenseCategoryType = {
    id: number | null,
    title: string | null
}

export type ExpenseCreateDataType = {
    title: string
}

export type ExpenseResultResponseType = {
    error: boolean,
    response: ExpenseCategoryType | ExpenseCategoryType[];
}