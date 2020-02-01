import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationVariables } from 'app/app.variables';
import { AuthGuard } from 'app/core/guards';
import { LoginComponent } from 'app/login/login.component';

export const paths = {
    dashboard: '',
    agency: 'agency',
    agent: 'agent',
    login: 'login',
    mobileRegion: 'region',
    region: 'region',
    // webRegion: 'region/web',
    //  : 'admin/agency-list',
    // report : 'report',
}

let routes: Routes = [
    { path: paths.dashboard, pathMatch: 'full', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canActivate: [/* AuthGuard */] },
    { path: paths.agent, pathMatch: 'prefix', loadChildren: 'app/agent/agent.module#AgentModule', canActivate: [AuthGuard] },
    { path: paths.agency, pathMatch: 'prefix', loadChildren: 'app/agency/agency.module#AgencyModule', canActivate: [AuthGuard] },
    // { path: paths.region, pathMatch: 'prefix', loadChildren: 'app/region/region.module#RegionModule', canActivate: [AuthGuard] },
    { path: paths.login, component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
