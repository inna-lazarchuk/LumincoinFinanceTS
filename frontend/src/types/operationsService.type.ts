export type OperationsResultResponseType =
    {
        error: boolean,
        response: {
            id: number,
            type: string,
            amount: number,
            date: string,
            comment: string,
            category: string
        }[]
    }

export type OperationsReturnObjectType = {
    error: boolean | string,
    allOperations: OperationType[] | null
}

export type OperationsResponseBodyType = {
    dateFrom: string,
    dateTo: string
}

export type OperationResultResponseType = {
    error: boolean,
    response: OperationType
}

export type OperationType = {
    id: number,
    type: string,
    amount: number,
    date: string,
    comment: string,
    category: string
}

export type OperationReturnObjectType = {
    error: boolean | string,
    operation: null | OperationType
}

export type IncomeExpensesAddBodyType = {
    type: string,
    amount: number,
    date: string,
    comment: string,
    category_id: number
}
