import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/providers';
import { environment } from 'env/environment';
import { bind } from 'helpful-decorators';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'admin-login-with',
    template: '<admin-phone-input (change)="change.next($event.phone);"></admin-phone-input>',
})
export class LoginWithComponent implements OnInit {
    change = new BehaviorSubject<string>('');

    constructor(private __auth: AuthService) { }
    ngOnInit() {

        this.change
            .pipe(filter(phone => !!phone))
            .subscribe(this._login)
    }

    @bind
    private _login(phone: string) {

        this.__auth
            .loginWith(phone)
            .subscribe(res =>
                window.open(`${environment.urls.loginAs}${encodeURIComponent(res.token)}`, '_blank')
            );
    }
}
