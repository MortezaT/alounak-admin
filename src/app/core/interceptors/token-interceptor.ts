import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/providers/auth.service';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { bind } from 'helpful-decorators';

export interface AuthenticationConfig {

    tokenWhitelistPaths: string[];
    tokenExclude: (string | RegExp)[];
}

export const AuthenticationConfigService = new InjectionToken<AuthenticationConfig>('AuthRoutePaths');

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private __router: Router, private __auth: AuthService, @Inject(AuthenticationConfigService) private __authConfig: AuthenticationConfig) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this._getToken(this.__auth.adminToken, req.url);
        // console.log('Token interceptor on url:\t', req.url);

        if (token) {

            req = req.clone({
                setHeaders: {
                    'X-Auth-Token': token,
                }
            });
        }
        const obs = next.handle(req);

        obs.pipe(
            tap(this._checkResponse, this._checkResponse, () => console.log('done')),
            filter(res => res instanceof HttpResponse),
        );

        return obs;
    }

    @bind
    _checkResponse(res: HttpResponse<any>) {

        console.log(res);

        if (res.status === 401/* Unauthorized */) {

            this.__auth.navigateToLogin(this.__router.url);
        }
    }

    private _getToken(token: string | null, url: string): string {

        token = token || '';
        const hasToken = !!token;
        const isWhiteListed = this.__authConfig.tokenWhitelistPaths.some(matcher => !!url.startsWith(matcher));
        const isExcluded = this.__authConfig.tokenExclude.some(matcher => !!url.match(matcher));
        return (hasToken && isWhiteListed && !isExcluded) ? token : '';
    }
}
