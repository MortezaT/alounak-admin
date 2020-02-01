import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlounakPage } from 'app/core/lib';
import { PageHelperService } from 'app/core/providers';
import { AgentService } from '../providers';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

AutoUnsubscribe()
@Component({
    selector: 'admin-agent',
    templateUrl: './agent.component.html',
    styleUrls: ['./agent.component.scss']
})
export class AgentEditComponent extends AlounakPage {
    phoneSubject$ = new BehaviorSubject<string>('')
    phone$ = this.phoneSubject$.pipe(filter(phone => !!phone));
    form: FormGroup;
    validUsername: boolean = false;

    constructor(helper: PageHelperService, private __srv: AgentService) {

        super(helper, 'ویرایش اطلاعات کارشناس')
    }

    ngOnInit() {

        this._createForm();
        this.phoneSubject$.next(this.__pageHelper.queryParams.phone);
        this.phone$.subscribe(phone => {
            this.form.reset();
            this.__srv.get(phone)
                .subscribe(res => {
                    this.form.patchValue(res);
                });
        })
    }

    submit() {

        this.phone$.subscribe(phone => {
            this.__srv
                .update(this.form.value, phone)
                .subscribe();
        })
    }

    private _createForm() {

        const username = new FormControl({ value: '', disabled: true }, [Validators.required]);
        const name = new FormControl({ value: '', disabled: true });
        const lastname = new FormControl({ value: '', disabled: true });
        const aboutme = new FormControl('', []);
        const premiere = new FormControl('', [Validators.min(0), Validators.max(25)]);
        const certificate = new FormControl('', [Validators.min(0), Validators.max(2)]);
        this.form = new FormGroup({ username, name, lastname, aboutme, premiere, certificate });
    }
}
