import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { AgenciesComponent, AgencyComponent } from '.';

const routes: Routes = [
    { path: 'new', component: AgencyComponent },
    { path: ':username', pathMatch: 'full', component: AgencyComponent },
    { path: '', pathMatch: 'full', component: AgenciesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AgencyRoutingModule { }

const actions = ['new', 'edit'];
function agencyMatcher(url: UrlSegment[]): UrlMatchResult {

    const [action] = url;
    if (!(action && actions.includes(action.path)))
        return <any>null;

    return { consumed: url };
}
