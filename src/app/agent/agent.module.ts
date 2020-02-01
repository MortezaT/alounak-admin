import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { CoreModule } from 'app/core';
import { AgentEditComponent } from './agent/agent.component';
import { AgentRoutingModule } from './agent-routing.module';
import { SharedModule } from 'app/shared/shared.module';

const ngModules = [
    CommonModule,
    ReactiveFormsModule,
]

const matModules = [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
]

const appModules = [
    CoreModule,
    SharedModule,
];

@NgModule({
    imports: [
        ...ngModules,
        ...matModules,
        ...appModules,
        AgentRoutingModule,
    ],
    declarations: [AgentEditComponent]
})
export class AgentModule { }
