import {HttpUtils} from "../utils/http-utils";
import {
    IncomeExpensesAddBodyType,
    OperationReturnObjectType,
    OperationsResponseBodyType,
    OperationsReturnObjectType,
    OperationsResultResponseType,
    OperationResultResponseType,
    OperationType
} from "../types/operationsService.type";
import {CommonErrorType} from "../types/commonError.type";

export class OperationsService {

    public static async getAllOperationsPeriod(period: string): Promise<OperationsReturnObjectType> {
        const returnObject: OperationsReturnObjectType = {
            error: false,
            allOperations: null
        }

        const result: OperationsResultResponseType | CommonErrorType = await HttpUtils.request('/operations?period=' + period);
        console.log(result);

        if ((result as CommonErrorType).error || (result as OperationsResultResponseType).error) {
            returnObject.error = 'Возникла ошибка при запросе доходов и расходов. Обратитесь в поддержку';
            return returnObject;
        }

            returnObject.allOperations = (result as OperationsResultResponseType).response;
            return returnObject;
    }

    private static body: OperationsResponseBodyType;

    public static async getAllOperationsInterval(period: string, body: OperationsResponseBodyType): Promise<OperationsReturnObjectType> {
        const returnObject: OperationsReturnObjectType = {
            error: false,
            allOperations: null
        }
        this.body = body;

        const result: OperationsResultResponseType | CommonErrorType = await HttpUtils.request('/operations?period=' + period + '&dateFrom=' + this.body.dateFrom + '&dateTo=' + this.body.dateTo);

        if ((result as CommonErrorType).error || (result as OperationsResultResponseType).error) {
            returnObject.error = 'Возникла ошибка при запросе доходов и расходов. Обратитесь в поддержку';
            return returnObject;
        }

        returnObject.allOperations = (result as OperationsResultResponseType).response;
        return returnObject;
    }

    public static async getOperationById(id: number): Promise<OperationReturnObjectType> {
        const returnObject: OperationReturnObjectType = {
            error: false,
            operation: null
        }
        const result: OperationResultResponseType | CommonErrorType = await HttpUtils.request('/operations/' + id);

        if ((result as CommonErrorType).error || (result as OperationResultResponseType).error) {
            returnObject.error = 'Возникла ошибка при запросе операции. Обратитесь в поддержку';
            return returnObject;
        }

        returnObject.operation = (result as OperationResultResponseType).response;
        return returnObject;
    }

    public static async addIncomeExpense(body: IncomeExpensesAddBodyType): Promise<OperationReturnObjectType> {
        const returnObject: OperationReturnObjectType = {
            error: false,
            operation: null
        }

        const result: OperationResultResponseType | CommonErrorType = await HttpUtils.request('/operations', "POST", true, body);

        if ((result as CommonErrorType).error || (result as OperationResultResponseType).error) {
            (returnObject).error = 'Возникла ошибка при добавлении категории дохода. Обратитесь в поддержку';
            return returnObject;
        }

        if(returnObject.operation){
            returnObject.operation.id = (result as OperationResultResponseType).response.id;
            returnObject.operation.type = (result as OperationResultResponseType).response.type;
            returnObject.operation.amount = (result as OperationResultResponseType).response.amount;
            returnObject.operation.date = (result as OperationResultResponseType).response.date;
            returnObject.operation.comment = (result as OperationResultResponseType).response.comment;
            returnObject.operation.category = (result as OperationResultResponseType).response.category;
        }

        return returnObject;
    }

    public static async editOperation(id: number, data: IncomeExpensesAddBodyType): Promise<OperationReturnObjectType> {
        const returnObject: OperationReturnObjectType = {
            error: false,
            operation: null
        };

        const result: OperationResultResponseType | CommonErrorType  = await HttpUtils.request('/operations/' + id, "PUT", true, data);
        if ((result as CommonErrorType).error || (result as OperationResultResponseType).error) {
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