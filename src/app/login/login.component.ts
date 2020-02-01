import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlounakPage } from 'app/core/lib';
import { AuthService, PageHelperService } from 'app/core/providers';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    selector: 'admin-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AlounakPage {
    form: FormGroup;

    constructor(helper: PageHelperService, private __auth: AuthService) {

        super(helper, 'ورود');
    }

    ngOnInit() {

        const username = new FormControl('', [Validators.required])
        const password = new FormControl('', [Validators.required, Validators.minLength(4)])
        this.form = new FormGroup({ username, password });
        this.__auth.isAuthenticated$
            .subscribe(isAuthenticated => isAuthenticated && this._navigate())
    }

    login() {

        this.__auth.login(this.form.value).subscribe();
    }

    private _navigate() {

        this.__auth.navigateToStartOrBack();
    }
}
