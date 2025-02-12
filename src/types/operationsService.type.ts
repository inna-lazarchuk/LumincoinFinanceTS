export type OperationsServiceType =
    {
        id: number,
        type: string,
        amount: number,
        date: string,
        comment: string,
        category: string
    }


export type OperationsReturnObjectType = {
    error: boolean | string,
    allOperations: OperationsServiceType[] | null
}

export type OperationsResponseBodyType = {
    dateFrom: string,
    dateTo: string
}

export type OperationResponseType = {
    id: number,
    type: string,
    amount: number,
    date: string,
    comment: string,
    category: string
}

export type OperationReturnObjectType = {
    error: boolean | string,
    operation: null | OperationResponseType
}

export type IncomeExpensesAddBodyType = {
    type: string,
    amount: number,
    date: string,
    comment: string,
    category_id: number
}
