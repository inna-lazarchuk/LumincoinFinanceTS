import {AuthUtils} from "../utils/auth-utils";
import {AuthService} from "../services/auth-service";
import {LogOutBodyType} from "../types/authService.type";

export class Logout {
    private openNewRoute: (url: string) => Promise<void>;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            this.openNewRoute('/login').then();
        }
        this.logout().then();
    }

    private async logout(): Promise<void> {
        await AuthService.logOut({
            refreshToken: AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey),
        } as LogOutBodyType)

        AuthUtils.removeAuthInfo();
        this.openNewRoute('/login');
    }
}