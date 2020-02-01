import { Injectable } from '@angular/core';
import { AlounakProvider } from 'app/core/lib/provider';
import { ServiceHelperService } from 'app/core/providers';
import { environment } from 'env/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map, share, shareReplay } from 'rxjs/operators';
import { memo } from 'helpful-decorators';

interface SearchResult<T> {
    creationDate: number;
    list: T[];
}

export interface Region {
    uuid: string;
    parentRegionId: string;
    ancestorTitle: string;
    title: string;
    zoom: number;
    centerLat: number;
    centerLong: number;
    photoUrl?: string;
    cityId?: any;
}

const urls = {
    search: `${environment.urls.userApi}/regions/search`
};

@Injectable({
    providedIn: 'root'
})
export class RegionService extends AlounakProvider {

    constructor(helper: ServiceHelperService) {

        super(helper);
    }

    @memo((...args: any[]) => `${args}`)
    search(title: string, level: number = 2): Observable<Region[]> {

        const level2 = (+level === 2) || '';
        const params = new HttpParams({ fromObject: <any>{ title, includeLevel2: level2, limitToLevel2: level2 } });

        const obs = this._get<SearchResult<Region>>(urls.search, params)

        return obs.pipe(map(res => res.list), shareReplay());
    }
}
