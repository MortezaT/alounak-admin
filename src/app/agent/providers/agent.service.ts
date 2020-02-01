import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlounakProvider } from 'app/core/lib/provider';
import { ServiceHelperService } from 'app/core/providers';
import { environment } from 'env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const urls = {
    get: `${environment.urls.api}/agent/get-agent`,
    update: `${environment.urls.api}/agent`,
}

export interface Response<T> {
    code: string;
    messageFa?: string;
    payLoad: T;
    message: string;
    type: string;
}

export interface Agent {
    certificate: number;
    username: string;
    agencyId?: any;
    agencyState?: any;
    aboutme?: any;
    premiere?: any;
    agentId: string;
    lastname: string;
    name: string;
    state: number;
}

@Injectable({
    providedIn: 'root'
})
export class AgentService extends AlounakProvider {

    constructor(helper: ServiceHelperService) {

        super(helper);
    }

    get(username: string): Observable<Agent> {

        const params = new HttpParams({ fromObject: { username } });
        const obs = this._get<Response<Agent>>(urls.get, params);

        return obs.pipe(map(res => res.payLoad));
    }

    update(agent: Agent, username: string): Observable<null> {

        const url = `${urls.update}/${username}`;
        const obs = this._put<Response<null>>(url, agent);

        return obs.pipe(map(res => res.payLoad));
    }
}
