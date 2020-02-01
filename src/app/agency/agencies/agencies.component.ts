import { Component } from '@angular/core';
import { AlounakPage } from 'app/core/lib';
import { PageHelperService } from 'app/core/providers';

@Component({
    selector: 'admin-agencies',
    templateUrl: './agencies.component.html',
    styleUrls: ['./agencies.component.scss']
})
export class AgenciesComponent extends AlounakPage {

    constructor(helper: PageHelperService) {

        super(helper, 'لیست آژانسهای املاک');
    }
}
