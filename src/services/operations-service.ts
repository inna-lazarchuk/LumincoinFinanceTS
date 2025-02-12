import {HttpUtils} from "../utils/http-utils";
import {
    IncomeExpensesAddBodyType, OperationResponseType, OperationReturnObjectType,
    OperationsResponseBodyType,
    OperationsServiceType, OperationsReturnObjectType
} from "../types/operationsService.type";
import {CommonErrorType} from "../types/commonError.type";

export class OperationsService {

    public static async getAllOperationsPeriod(period: string): Promise<OperationsReturnObjectType> {
        const returnObject: OperationsReturnObjectType = {
            error: false,
            allOperations: null
        }

        const result: OperationsServiceType | CommonErrorType = await HttpUtils.request('/operations?period=' + period);
        console.log(result);

        if ((result as CommonErrorType).error) {
            returnObject.error = 'Возникла ошибка при запросе доходов и расходов. Обратитесь в поддержку';
            return returnObject;
        }

            returnObject.allOperations = (result as OperationsServiceType[]);
            return returnObject;
    }

    private static body: OperationsResponseBodyType;

    public static async getAllOperationsInterval(period: string, body: OperationsResponseBodyType): Promise<OperationsReturnObjectType> {
        const returnObject: OperationsReturnObjectType = {
            error: false,
            allOperations: null
        }
        this.body = body;

        const result: OperationsServiceType | CommonErrorType = await HttpUtils.request('/operations?period=' + period + '&dateFrom=' + this.body.dateFrom + '&dateTo=' + this.body.dateTo);

        if ((result as CommonErrorType).error) {
            returnObject.error = 'Возникла ошибка при запросе доходов и расходов. Обратитесь в поддержку';
            return returnObject;
        }

        returnObject.allOperations = (result as OperationsServiceType[]);
        return returnObject;
    }

    public static async getOperationById(id: number): Promise<OperationReturnObjectType> {
        const returnObject: OperationReturnObjectType = {
            error: false,
            operation: null
        }
        const result: OperationResponseType | CommonErrorType = await HttpUtils.request('/operations/' + id);

        if ((result as CommonErrorType).error || !result) {
            returnObject.error = 'Возникла ошибка при запросе операции. Обратитесь в поддержку';
            return returnObject;
        }

        returnObject.operation = result as OperationResponseType;
        return returnObject;
    }

    public static async addIncomeExpense(body: IncomeExpensesAddBodyType): Promise<OperationReturnObjectType> {
        const returnObject: OperationReturnObjectType = {
            error: false,
            operation: null
        }

        const result: OperationResponseType | CommonErrorType = await HttpUtils.request('/operations', "POST", true, body);

        if ((result as CommonErrorType).error || !result) {
            (returnObject).error = 'Возникла ошибка при добавлении категории дохода. Обратитесь в поддержку';
            return returnObject;
        }

            (returnObject.operation as OperationResponseType).id = (result as OperationResponseType).id;
            (returnObject.operation as OperationResponseType).type = (result as OperationResponseType).type;
            (returnObject.operation as OperationResponseType).amount = (result as OperationResponseType).amount;
            (returnObject.operation as OperationResponseType).date = (result as OperationResponseType).date;
            (returnObject.operation as OperationResponseType).comment = (result as OperationResponseType).comment;
            (returnObject.operation as OperationResponseType).category = (result as OperationResponseType).category;

        return returnObject;
    }

    public static async editOperation(id: number, data: IncomeExpensesAddBodyType): Promise<OperationReturnObjectType> {
        const returnObject: OperationReturnObjectType = {
            error: false,
            operation: null
        };

        const result: OperationResponseType | CommonErrorType  = await HttpUtils.request('/operations/' + id, "PUT", true, data);
        if ((result as CommonErrorType).error || !result) {
            returnObject.error = 'Возникла ошибка при редактировании дохода или расхода. Обратитесь в поддержку';

        }
        return returnObject;
    }

    public static async deleteIncomeExpenseCategory(id: number): Promise<boolean> {

        const result: CommonErrorType = await HttpUtils.request('/operations/' + id, "DELETE", true);
        if (result.error) {
            console.log('Возникла ошибка при удалении операции. Обратитесь в поддержку');
            return false;
        }
        console.log('Удаление операции прошло успешно')
        return true;
    }
}