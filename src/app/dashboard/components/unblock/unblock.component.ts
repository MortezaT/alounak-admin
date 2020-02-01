import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/providers';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'admin-unblock',
    template: '<admin-phone-input icon="lock_open" (change)="change.next($event.phone);"></admin-phone-input>',
})
export class UnblockComponent implements OnInit {
    change = new BehaviorSubject<string>('');

    constructor(private __auth: AuthService) { }
    ngOnInit() {

        this.change
            .pipe(filter(phone => !!phone))
            .subscribe(phone =>

                this.__auth
                    .unblock(phone)
                    .subscribe()
            );
    }
}
