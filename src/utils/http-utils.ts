import config from "../config/config";
import {AuthUtils} from "./auth-utils";
import {CommonErrorType} from "../types/commonError.type";
import {ResultRequestType} from "../types/resultRequest.type";

export class HttpUtils {
    public static async request(url: string, method: string = "GET", useAuth: boolean = true, body: any = null): Promise<any> {
        const result: ResultRequestType = {
            error: false,
            response: null
        };

        const params: any = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
        };

        let token: string | null = null;

        if (useAuth) {
            token = AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) as string;
            if (token) {
                params.headers['x-auth-token'] = token;
            }
        }

        if (body) {
            params.body = JSON.stringify(body);
        }

        let response = null;

        try {
            response = await fetch(config + url, params);
            result.response = await response.json();
            console.log(result.response);
        } catch (e) {
            result.error = true;
            return result;
        }

        if (response.status < 200 || response.status >= 300) {
            result.error = true;
            if (useAuth && response.status === 401) {
                if (!token) {
                    //1 - токена нет
                    result.redirect = '/login';
                } else {
                    //2 - токен устарел или невалидный, надо обновить
                    const updateTokenResult: boolean = await AuthUtils.updateRefreshToken();

                    if (updateTokenResult) {
                        //запрос повторно
                        return this.request(url, method, useAuth, body);
                    } else {
                        result.redirect = '/login';
                    }
                }
            }
        }

        return result;
    }
}