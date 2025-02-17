import {HttpUtils} from "../utils/http-utils";
import {
    CategoryExpenseResultResponseType,
    ExpenseCategoryType,
    ExpenseCreateDataType, ExpenseResultResponseType,
    ExpenseReturnObjectType
} from "../types/expensesService.type";
import {CommonErrorType} from "../types/commonError.type";

export class ExpensesService {
    public static async getCategories(): Promise<ExpenseReturnObjectType> {
        const returnObject: ExpenseReturnObjectType = {
            error: false,
            category: {
                id: null,
                title: null
            }
        }
        const result: ExpenseResultResponseType | CommonErrorType = await HttpUtils.request('/categories/expense');
        if ((result as CommonErrorType).error || (result as ExpenseResultResponseType).error) {
            returnObject.error = 'Возникла ошибка при запросе всех категорий расходов. Обратитесь в поддержку';
            return returnObject;
        }
        returnObject.category = (result as ExpenseResultResponseType).response;
        return returnObject
    }

    public static async getCategory(id: number): Promise<ExpenseReturnObjectType> {
        const returnObject: ExpenseReturnObjectType = {
            error: false,
            category: {
                id: null,
                title: null
            }
        }
        const result: CategoryExpenseResultResponseType | CommonErrorType = await HttpUtils.request('/categories/expense/' + id);
        if ((result as CommonErrorType).error || (result as ExpenseResultResponseType).error) {
            returnObject.error = 'Возникла ошибка при запросе категории. Обратитесь в поддержку';
            return returnObject;
        }

        returnObject.category = (result as ExpenseResultResponseType).response;
        return returnObject;
    }

    public static async createCategory(data: string): Promise<ExpenseReturnObjectType> {
        const returnObject: ExpenseReturnObjectType = {
            error: false,
            category: {
                id: null,
                title: null
            }
        };
        const changedData: ExpenseCreateDataType = {title: data};
        const result: ExpenseResultResponseType | CommonErrorType = await HttpUtils.request('/categories/expense', "POST", true, changedData);
        if ((result as CommonErrorType).error || !result) {
            returnObject.error = 'Возникла ошибка при добавлении категории расхода. Обратитесь в поддержку';
            return returnObject;
        }

        (returnObject.category as ExpenseCategoryType).id = ((result as ExpenseResultResponseType).response as ExpenseCategoryType).id;
        (returnObject.category as ExpenseCategoryType).title = ((result as ExpenseResultResponseType).response as ExpenseCategoryType).title;

        return returnObject;
    }

    public static async editCategory(id: number, data: string): Promise<ExpenseReturnObjectType> {
        const returnObject: ExpenseReturnObjectType = {
            error: false,
            category: {
                id: null,
                title: null
            }
        };
        const changeData: ExpenseCreateDataType = {title: data}
        const result: ExpenseCategoryType = await HttpUtils.request('/categories/expense/' + id, "PUT", true, changeData);
        if ((result as CommonErrorType).error || !result) {
            returnObject.error = 'Возникла ошибка при редактировании категории расхода. Обратитесь в поддержку';
            return returnObject;
        }
        return returnObject;
    }

    public static async deleteExpenseCategory(id: number): Promise<boolean> {
        const result: CommonErrorType = await HttpUtils.request('/categories/expense/' + id, "DELETE", true);
        if ((result as CommonErrorType).error || !result) {
            console.log('Возникла ошибка при удалении категории расхода. Обратитесь в поддержку');
            return false;
        }
        console.log('Удаление категории прошло успешно')
        return true;
    }
}