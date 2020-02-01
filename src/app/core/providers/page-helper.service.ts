import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PageHelperService {
    private __title: BehaviorSubject<string>;
    title$: Observable<string>

    // get params() { return this.__route.snapshot.params; }
    get queryParams() { return this.__route.snapshot.queryParams; }

    constructor(private __titleService: Title, private __route: ActivatedRoute, public router: Router) {

        this.__title = new BehaviorSubject('آلونک');
        this.title$ = this.__title.asObservable();
        this.__title.subscribe(newTitle => this.__titleService.setTitle(newTitle));
    }

    setTitle(value: string) { this.__title.next(value); }

}
