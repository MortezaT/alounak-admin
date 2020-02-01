import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { paths } from 'app/app-routing.module';
import { urlFromRoot } from 'app/core/lib/route';
import { AuthService, PageHelperService } from 'app/core/providers';
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface MenuItem {
    title: string;
    link: any[] | string;
    options?: any;
}

interface Theme {
    name: string;
    className: string;
}

@AutoUnsubscribe()
@Component({
    selector: 'admin-sidenav',
    templateUrl: './admin-sidenav.component.html',
    styleUrls: ['./admin-sidenav.component.scss']
})
export class AdminSidenavComponent implements OnInit, OnDestroy {
    isAuthenticated$ = this.__auth.isAuthenticated$;
    isHandset$: Observable<boolean> = this
        .__breakpointObserver.observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));
    title$ = this.__page.title$;

    themes: Theme[] = [
        { name: 'آلونک', className: 'alounak-theme' },
        { name: 'آلونک تیره', className: 'alounak-dark-theme' },
        // {name: 'آلونک'},
    ]

    menuItems: MenuItem[] = [
        { title: 'داشبورد', options: { exact: true }, link: [urlFromRoot(paths.dashboard)], },
        // { title: 'اطلاعات مناطق (سایت)', options:{exact: true}, link: [urlFromRoot(AppPaths.dashboard)], },
        // { title: 'اطلاعات مناطق (موبایل)', options:{exact: true}, link: [urlFromRoot(AppPaths.dashboard)], },
        { title: 'اطلاعات کارشناس', options: {}, link: [urlFromRoot(paths.agent, 'edit')], },
        { title: 'ثبت آژانس املاک', options: { exact: true }, link: [urlFromRoot(paths.agency, 'new')], },
        { title: 'لیست آژانسها', options: { exact: true }, link: [urlFromRoot(paths.agency)], },
        // { title: 'گزارش', options:{exact: true}, link: [urlFromRoot(AppPaths.report)], },
    ];

    constructor(private __overlayContainer: OverlayContainer, private __breakpointObserver: BreakpointObserver, private __title: Title
        , private __auth: AuthService, private __page: PageHelperService) { }

    ngOnInit() {

        this.changeTheme(this.themes[1]);
    }

    logOut() {

        this.__auth.logout();
    }

    changeTheme(theme: Theme) {


        let classes = document.body.classList; //this.__overlayContainer.getContainerElement().classList;
        const classesToRemove = Array.from(classes).filter(c => c.includes('-theme'));
        classes.remove(...classesToRemove);
        theme.className && classes.add(theme.className);

    }

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
}
