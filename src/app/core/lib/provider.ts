import { HttpParams } from '@angular/common/http';
import { ServiceHelperService } from "app-core/providers";

export abstract class AlounakProvider {
    constructor(protected __helper: ServiceHelperService) { }

    protected _get<T>(url: string, params?: HttpParams) {

        const obs = this.__helper.get<T>(url, params);
        return this.__helper.mapToBody(obs);
    }

    protected _post<T>(url: string, body?: any) {

        const obs = this.__helper.post<T>(url, body);
        return this.__helper.mapToBody(obs);
    }

    protected _put<T>(url: string, body?: any) {

        const obs = this.__helper.post<T>(url, body);
        return this.__helper.mapToBody(obs);
    }

    protected _delete<T>(url: string) {

        const obs = this.__helper.delete<T>(url);
        return this.__helper.mapToBody(obs);
    }
}
