import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

import { CoreModule } from 'app/core';
import { AgenciesComponent, AgencyComponent } from '.';
import { AgencyRoutingModule } from './agency-routing.module';
import { SharedModule } from 'app/shared/shared.module';

const ngModules = [
    CommonModule,
    ReactiveFormsModule,
];

const matModules = [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
]

const appModules = [
    CoreModule,
    SharedModule,
]

@NgModule({
    imports: [
        ...ngModules,
        ...matModules,
        ...appModules,
        AgencyRoutingModule
    ],
    declarations: [AgenciesComponent, AgencyComponent]
})
export class AgencyModule { }
