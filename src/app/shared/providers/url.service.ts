import { Injectable } from '@angular/core';
import { environment } from 'env/environment';

@Injectable({
    providedIn: 'root'
})
export class UrlService {
    constructor() { }

    agencyImage(urlPart?: string): string {

        return urlPart ? `${environment.urls.cdn}${urlPart}` : '';
    }
}
