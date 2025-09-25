export type CategoryResultResponseType = {
    error: boolean,
    response: IncomeCategoryType
}

export type IncomeReturnObjectType = {
    error: boolean | string,
    category: IncomeCategoryType[] | IncomeCategoryType
}

export type IncomeCategoryType = {
    id: number | null,
    title: string | null
}

export type IncomeResultResponseType = {
    error: boolean,
    response: IncomeCategoryType | IncomeCategoryType[];
}

export type IncomeCreateDataType = {
    title: string
}




