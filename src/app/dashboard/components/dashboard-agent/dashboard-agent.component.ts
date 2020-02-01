import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from 'app/app-routing.module';
import { urlFromRoot } from 'app/core/lib/route';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'admin-dashboard-agent',
    template: '<admin-phone-input (change)="change.next($event.phone);"></admin-phone-input>',
})
export class DashboardAgentComponent implements OnInit {
    change = new BehaviorSubject<string>('');

    constructor(private __router: Router) { }
    ngOnInit() {

        const path = urlFromRoot( paths.agent, 'edit');
        this.change
            .pipe(filter(phone => !!phone))
            .subscribe(phone =>
                this.__router.navigate([path], { queryParams: { phone } })
            );
    }

}
