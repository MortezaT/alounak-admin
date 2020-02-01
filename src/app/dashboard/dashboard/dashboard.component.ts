import { Component } from '@angular/core';
import { AlounakPage } from 'app-core/lib';
import { PageHelperService } from 'app-core/providers';

interface DashboardCard {
    id: number;
    title: string;
    cols: number;
    rows: number;
}

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends AlounakPage {

    constructor(page: PageHelperService) {

        super(page, 'داشبورد');
    }
}
