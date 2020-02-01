import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs';

@AutoUnsubscribe()
@Component({
    selector: 'alounak-page',
    template: `
        <div class="content">
            <ng-content></ng-content>
        </div>
    `,
    styles: [
        `:host{
            display: flex;
            flex-flow:column nowrap;
            min-height: calc(100vh - 64px);
        }`,
        `.content {
            flex: 1;
            display: flex;
            flex-flow: column nowrap;
            justify-content: flex-start;
            margin:20px;
        }`
    ]
})
export class PageComponent implements OnInit, OnDestroy {
    constructor() { }
    ngOnInit() { }
    ngOnDestroy() { }
}
