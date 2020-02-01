import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatRadioModule } from '@angular/material';
import { DpDatePickerModule } from "ng2-jalali-date-picker";

import { CoreModule } from 'app-core';
import { DashboardComponent } from 'app/dashboard/dashboard/dashboard.component';
import { DashboardAgentComponent, DashboardCardComponent, DashboardReportComponent, LoginWithComponent, RegionInformationComponent, UnblockComponent } from './components';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { ReportService } from 'app/dashboard/providers';

const ngModules = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
];

const matModules = [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
];

const appModules = [
    CoreModule,
    SharedModule,
]

@NgModule({
    imports: [
        ...ngModules,
        ...matModules,
        ...appModules,
        DashboardRoutingModule,
        DpDatePickerModule,
        FlexLayoutModule,
    ],
    declarations: [
        DashboardComponent,

        DashboardAgentComponent,
        DashboardCardComponent,
        DashboardReportComponent,
        LoginWithComponent,
        RegionInformationComponent,
        UnblockComponent,
    ],
    providers: [
        ReportService
    ]
})
export class DashboardModule { }
