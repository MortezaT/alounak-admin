import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationVariables } from 'app/app.variables';
import { urlFromRoot } from 'app/core/lib/route';
import { environment } from 'env/environment';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { map, tap, skip } from 'rxjs/operators';
import { ServiceHelperService } from './service-helper.service';
import { HttpParams } from '@angular/common/http';

export interface UserCredentials {
    username: string;
    password: string;
}

interface TokenResponse {
    username: string;
    agentAdminToken: string;
    userAdminToken: string;
}

interface LoginWithResponse {
    token: string;
    userId: string;
}

const urls = {
    login: `${environment.urls.api}/login`,
    loginWith: `${environment.urls.api}/login/login-with`,
    unblock: `${environment.urls.api}/agency/clear-attack`,
}
export interface AuthRoutePaths {
    startPath?: string;
    loginPath: string;
}

export const AuthRoutePathsService = new InjectionToken<AuthRoutePaths>('AuthRoutePaths');

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public get adminToken(): string | null { return this._retrive('adminToken'); }
    public set adminToken(value: string | null) { this._storeOrClean('adminToken', value) }

    public get userToken(): string | null { return this._retrive('userToken'); }
    public set userToken(value: string | null) { this._storeOrClean('userToken', value); }

    private _authSubject$: BehaviorSubject<boolean>;
    isAuthenticated$: Observable<boolean>;

    constructor(private __router: Router, private __route: ActivatedRoute, private __helper: ServiceHelperService, @Inject(AuthRoutePathsService) private __paths: AuthRoutePaths) {

        const isAuthenticated = !!this.adminToken;
        this._authSubject$ = new BehaviorSubject<boolean>(isAuthenticated);
        this.isAuthenticated$ = this._authSubject$.asObservable();

        this._reRouteOnChange();
    }

    login(creds: UserCredentials): Observable<boolean> {

        let obs = this.__helper.post<TokenResponse>(urls.login, creds);
        return this.__helper.mapToBody(obs).pipe(
            tap(res => this._setToken(res)),
            map(res => !!res.agentAdminToken)
        );
    }

    loginWith(phone: string): Observable<LoginWithResponse> {

        const params = new HttpParams({ fromObject: { username: phone } });
        console.log(params, params.toString());

        let obs = this.__helper.get<LoginWithResponse>(urls.loginWith, params);
        return this.__helper.mapToBody(obs);
    }

    unblock(phone: string): Observable<null> {

        const url = `${urls.unblock}/${phone}`;
        const obs = this.__helper.get<null>(url);
        return this.__helper.mapToBody(obs);
    }

    logout(): void {

        this._setToken();
    }

    navigateToLogin(returnUrl?: string): void {

        let route = urlFromRoot(this.__paths.loginPath);
        this.__router.navigate([route], { queryParams: { returnUrl } });
    }

    navigateToStartOrBack() {

        const { returnUrl } = this.__route.snapshot.queryParams;

        let route = returnUrl || urlFromRoot(this.__paths.startPath || '');
        this.__router.navigate([route]);
    }


    private _setToken({ agentAdminToken: admin, userAdminToken: user }: TokenResponse = <any>{}): void {

        this.adminToken = admin;
        this.userToken = user;
        this._authSubject$.next(!!admin);
    }


    private _retrive(key: string) {

        return localStorage.getItem(key);
    }

    private _storeOrClean(key: string, value: string | null): void {

        value
            ? localStorage.setItem(key, '' + value)
            : localStorage.removeItem(key);
    }

    _reRouteOnChange() {

        this.isAuthenticated$
            .pipe(skip(1))
            .subscribe(isAuthenticated => {

                isAuthenticated
                    ? this.navigateToStartOrBack()
                    : this.navigateToLogin()
            });
    }
}
