import config from "../../src/config/config";
import {AuthInfoType, AuthInfoUserNameType} from "../types/authInfo.type";

export class AuthUtils {
    public static accessTokenKey: string = 'accessToken';
    public static refreshTokenKey: string = 'refreshToken';
    public static userInfoTokenKey: string = 'userInfo';

    public static setAuthInfo(accessToken: string | null, refreshToken: string | null, userInfo: AuthInfoUserNameType | null = null): void {
        localStorage.setItem(this.accessTokenKey, accessToken as string);
        localStorage.setItem(this.refreshTokenKey, refreshToken as string);

        if (userInfo) {
            localStorage.setItem(this.userInfoTokenKey, JSON.stringify(userInfo));
        }

    }

    public static removeAuthInfo(): void {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.userInfoTokenKey);
    }

    public static getAuthInfo(key: string | null = null): string | AuthInfoType {
        if (key && [this.accessTokenKey, this.refreshTokenKey, this.userInfoTokenKey].includes(key)) {
            return localStorage.getItem(key) as string;
        } else {
            const accessToken = localStorage.getItem(this.accessTokenKey);
            const refreshToken = localStorage.getItem(this.refreshTokenKey);
            const userInfo = localStorage.getItem(this.userInfoTokenKey);

            return {
                [this.accessTokenKey]: accessToken,
                [this.refreshTokenKey]: refreshToken,
                [this.userInfoTokenKey]: userInfo ? JSON.parse(userInfo) : null,
            } as AuthInfoType;
        }
    }

    public static async updateRefreshToken(): Promise<boolean> {
        let result: boolean = false;
        const refreshToken: string = this.getAuthInfo(this.refreshTokenKey) as string;
        if (refreshToken) {
            const response: Response = await fetch( config + '/refresh', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: refreshToken,
                })
            })
            if (response && response.status === 200) {
                const data = await response.json();
                if (data && !data.error) {
                    this.setAuthInfo(data.tokens.accessToken, data.tokens.refreshToken);
                    result = true;
                }
            }
        }

        if (!result) {
            this.removeAuthInfo()
        }
        return result;
    }

}