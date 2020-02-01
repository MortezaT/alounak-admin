import { OnInit, OnDestroy } from "@angular/core";
import { PageHelperService } from "app-core/providers";
import { Observable } from "rxjs";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
export abstract class AlounakPage implements OnInit, OnDestroy {
    public title$ = this.__pageHelper.title$;

    constructor(protected __pageHelper: PageHelperService, initialPageTitle: string) {

        this.setTitle(initialPageTitle);
    }

    ngOnInit(): void { }

    public setTitle(value: string) { this.__pageHelper.setTitle(value); }

    ngOnDestroy(): void { }
}
