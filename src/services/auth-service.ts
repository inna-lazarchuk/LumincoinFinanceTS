import {HttpUtils} from "../utils/http-utils";
import {
    AuthErrorType,
    LoginDataType,
    LoginResponseType, LogOutBodyType,
    SignInBodyType,
    SignInResponseType
} from "../types/authService.type";
import {CommonErrorType} from "../types/commonError.type";

export class AuthService {
    public static async logIn(data: LoginDataType): Promise<boolean | LoginResponseType> {
        const result: LoginResponseType | AuthErrorType = await HttpUtils.request('/login', 'POST', false, data);

        if ((result as AuthErrorType).error || !result || ((result as LoginResponseType) && (!(result as LoginResponseType).tokens.accessToken || !(result as LoginResponseType).tokens.refreshToken || !(result as LoginResponseType).user.id || !(result as LoginResponseType).user.name))) {
            return false;
        } else {
            return result as LoginResponseType;
        }
    }

    public static async signUp(data: SignInBodyType): Promise<boolean | SignInResponseType> {
        const result: SignInResponseType | AuthErrorType = await HttpUtils.request('/signup', 'POST', false, data);
console.log(result)
        if ((result as AuthErrorType).error || !(result as SignInResponseType).response || ((result as SignInResponseType).response  && (!(result as SignInResponseType).response.user.id || !(result as SignInResponseType).response.user.name || !(result as SignInResponseType).response.user.lastName || !(result as SignInResponseType).response.user.email))) {
            return false;
        } else {
            return result as SignInResponseType;
        }
    }

    public static async logOut(data: LogOutBodyType): Promise<void> {
        await HttpUtils.request('/logout', 'POST', false, data);
    }
}