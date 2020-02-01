import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentEditComponent } from './agent/agent.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'edit', /* component */ },
    { path: 'edit', component: AgentEditComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AgentRoutingModule { }
