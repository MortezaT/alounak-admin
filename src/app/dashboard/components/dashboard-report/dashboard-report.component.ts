import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JalaliValidators, RegexPattern, StringFormats } from 'app-core/lib';
import { ReportService } from 'app/dashboard/providers';
import * as moment from 'jalali-moment';
import { IDatePickerConfig } from 'ng2-jalali-date-picker';
import { environment } from 'env/environment';

const jDateValidators = [Validators.required, JalaliValidators.pattern(RegexPattern.JalaliDate)];
@Component({
    selector: 'admin-dashboard-report',
    templateUrl: './dashboard-report.component.html',
    styleUrls: ['./dashboard-report.component.scss']
})
export class DashboardReportComponent implements OnInit {
    form: FormGroup;
    fromDate: FormControl;
    toDate: FormControl;

    downForm: FormGroup;

    config: IDatePickerConfig;
    reportUrl: string;

    constructor(private __srv: ReportService) { }
    ngOnInit() {

        this._createForm();

        this.config = {
            locale: 'fa',
            format: StringFormats.date,
            closeOnSelect: true,
            firstDayOfWeek: 'sa',
            monthFormat: 'MMMM YYYY',
        };

    }

    generateReport(event: Event) {

        event.preventDefault();
        event.stopPropagation();
        let { fromDate, toDate } = this.form.value;

        const from = +moment.from(fromDate, 'fa', StringFormats.date).toDate();
        const to = +moment.from(toDate, 'fa', StringFormats.date).toDate();
        this.__srv.generate(from, to)
            .subscribe(reportCode => this.downForm.setValue({ reportCode }));
    }

    download(event: Event) {

        event.stopPropagation();
    }

    private _createForm() {

        this.fromDate = new FormControl('');
        this.toDate = new FormControl('', [...jDateValidators, JalaliValidators.greaterThan(this.fromDate)]);
        this.fromDate.setValidators([...jDateValidators, JalaliValidators.lessThan(this.toDate)]);

        this.form = new FormGroup({
            fromDate: this.fromDate,
            toDate: this.toDate,
        });


        const reportCode = new FormControl('', [Validators.required]);
        this.downForm = new FormGroup({ reportCode });
        reportCode.valueChanges
            .subscribe(code => this.reportUrl = `${environment.urls.report}/report-${code}.xls`);

    }
}
