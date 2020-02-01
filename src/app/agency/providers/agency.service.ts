import { Injectable } from '@angular/core';
import { AlounakProvider } from 'app/core/lib/provider';
import { ServiceHelperService } from 'app/core/providers';
import { environment } from 'env/environment';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

const urls = {
    main: `${environment.urls.api}/agency`,
    upload: `${environment.urls.api}/agency/upload-photo`,
};
// const urls = `${environment.urls.apiUrl}/agency`;

export interface Agency {
    password?: any;
    description?: string;
    username: string;
    phoneNumber: string;
    email?: string;
    latitude?: number;
    longitude?: number;
    score?: any;
    deleteData: boolean;
    originalPhotoUrl?: string;
    thumbnailPhotoUrl?: string;
    urlAddressPart?: string;
    address?: string;
    name: string;
    state: number;
}

export interface fileUploadResponse {
    thumbnailPhotoUrl: string;
    photoUrl: string;
}

@Injectable({
    providedIn: 'root'
})
export class AgencyService extends AlounakProvider {
    agencies$ = this.__all().pipe(shareReplay());

    constructor(helper: ServiceHelperService) {

        super(helper);
    }

    get(username: string): Observable<Agency> {

        // const url = `${url}/${username}`
        // const obs = this._get<Agency>(url);
        return this.agencies$
            .pipe(map(arr => arr.filter(a => a.username == username)[0]));
    }

    update(item: Agency): Observable<void> {

        const obs = this._put<void>(`${urls.main}/${item.username}`, item);
        return obs;
    }

    new(item: Agency): Observable<void> {

        const obs = this._post<void>(urls.main, item);
        return obs;
    }

    upload(formData: FormData): Observable<fileUploadResponse> {

        const obs = this._post<fileUploadResponse>(urls.upload, formData);
        return obs;
    }

    private __all(): Observable<Agency[]> {

        const obs = this._get<Agency[]>(urls.main);
        return obs;
    }
}
