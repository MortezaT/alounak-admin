import { Injectable } from '@angular/core';
import { AlounakProvider } from 'app/core/lib/provider';
import { ServiceHelperService, AuthService } from 'app/core/providers';
import { Observable } from 'rxjs';
import { environment } from 'env/environment';
import { map } from 'rxjs/operators';

interface ReportGenerateResult {
    number: number;
}
const urls = {
    generate: `${environment.urls.api}/reports`,
}

@Injectable({
    providedIn: 'root'
})
export class ReportService extends AlounakProvider {

    constructor(helper: ServiceHelperService, private __auth: AuthService) {

        super(helper);
    }

    generate(from: number, to: number): Observable<number> {

        const token = this.__auth.adminToken;
        const obs = this._post<ReportGenerateResult>(urls.generate, { from, to, token });

        return obs.pipe(map(res => res.number));
    }
}
