import {HttpUtils} from "../utils/http-utils";
import {
    CategoryResultResponseType,
    IncomeCategoryType,
    IncomeCreateDataType,
    IncomeResultResponseType,
    IncomeReturnObjectType
} from "../types/incomeService.type";
import {CommonErrorType} from "../types/commonError.type";

export class IncomeService {
    public static async getCategories(): Promise<IncomeReturnObjectType> {
        const returnObject: IncomeReturnObjectType = {
            error: false,
            category: {
                id: null,
                title: null
            }
        }
        const result: IncomeResultResponseType | CommonErrorType = await HttpUtils.request('/categories/income');
        if ((result as CommonErrorType).error || (result as IncomeResultResponseType).error) {
            returnObject.error = 'Возникла ошибка при запросе всех категорий доходов. Обратитесь в поддержку';
            return returnObject;
        }
        returnObject.category = (result as IncomeResultResponseType).response;
        return returnObject;
    }

    public static async getCategory(id: number): Promise<IncomeReturnObjectType> {
        const returnObject: IncomeReturnObjectType = {
            error: false,
            category: {
                id: null,
                title: null
            }
        }
        const result: CategoryResultResponseType | CommonErrorType = await HttpUtils.request('/categories/income/' + id);
        if ((result as CommonErrorType).error || (result as CategoryResultResponseType).error ) {
            returnObject.error = 'Возникла ошибка при запросе категории дохода. Обратитесь в поддержку';
            return returnObject;
        }
        returnObject.category = (result as CategoryResultResponseType).response;
        return returnObject;
    }

    public static async createCategory(data: string): Promise<IncomeReturnObjectType> {
        const returnObject: IncomeReturnObjectType = {
            error: false,
            category: {
                id: null,
                title: null
            }
        };
        const changedData: IncomeCreateDataType = {title: data};
        const result: IncomeResultResponseType | CommonErrorType = await HttpUtils.request('/categories/income', "POST", true, changedData);
        if ((result as CommonErrorType).error || (result as IncomeResultResponseType).error) {
            returnObject.error = 'Возникла ошибка при добавлении категории дохода. Обратитесь в поддержку';
            return returnObject;
        }

        (returnObject.category as IncomeCategoryType).id = ((result as IncomeResultResponseType).response as IncomeCategoryType).id;
        (returnObject.category as IncomeCategoryType).title = ((result as IncomeResultResponseType).response as IncomeCategoryType).title;

        return returnObject;
    }

    public static async editCategory(id: number, data: string): Promise<IncomeReturnObjectType> {
        const returnObject: IncomeReturnObjectType = {
            error: false,
            category: {
                id: null,
                title: null
            }
        };
        const changeData: IncomeCreateDataType = {title: data}
        const result: IncomeCategoryType | CommonErrorType = await HttpUtils.request('/categories/income/' + id, "PUT", true, changeData);
        if ((result as CommonErrorType).error || !result) {
            returnObject.error = 'Возникла ошибка при редактировании категории дохода. Обратитесь в поддержку';
            return returnObject;
        }
        return returnObject;
    }

    public static async deleteIncomeCategory(id: number): Promise<boolean> {
        const result: CommonErrorType = await HttpUtils.request('/categories/income/' + id, "DELETE", true);
        if (result.error || !result) {
            console.log('Возникла ошибка при удалении категории дохода. Обратитесь в поддержку');
            return false;
        }
        console.log('Удаление категории прошло успешно')
        return true;
    }
}