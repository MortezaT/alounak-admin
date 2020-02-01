import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

export enum HttpMethod {
    delete = 'DELETE',
    get = 'GET',
    head = 'HEAD',
    jsonp = 'JSONP',
    options = 'OPTIONS',
    post = 'POST',
    put = 'PUT',
    patch = 'PATCH',
};

export interface ServiceAdditionalParams {
    headers: HttpHeaders;
    params: HttpParams;
    responseType: 'arraybuffer' | 'blob' | 'json' | 'text';
    reportProgress: boolean;
    withCredentials: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ServiceHelperService {

    constructor(private __http: HttpClient) { }

    request<T>(request: HttpRequest<T>): Observable<HttpEvent<T>> {

        return this.__http.request(request);
    }

    get<T>(url: string, params?: HttpParams, otherParams = <ServiceAdditionalParams>{}): Observable<HttpEvent<T>> {

        if (params) {
            url = `${url}?${params.toString()}`
        }
        const request = this.createRequest(HttpMethod.get, url, undefined, otherParams);
        return this.request<T>(request);
    }

    post<T>(url: string, body?: any, otherParams = <ServiceAdditionalParams>{}): Observable<HttpEvent<T>> {

        const request = this.createRequest(HttpMethod.post, url, body, otherParams);
        return this.request<T>(request);
    }

    put<T>(url: string, body?: any, otherParams = <ServiceAdditionalParams>{}): Observable<HttpEvent<T>> {

        const request = this.createRequest(HttpMethod.put, url, body, otherParams);
        return this.request<T>(request);
    }

    delete<T>(url: string, otherParams = <ServiceAdditionalParams>{}): Observable<HttpEvent<T>> {

        const request = this.createRequest(HttpMethod.delete, url, undefined, otherParams);
        return this.request<T>(request);
    }

    createRequest<T>(method: HttpMethod, url: string, body: any | null, {
        headers = new HttpHeaders(),
        params = new HttpParams(),
        responseType = <any>'json',
        reportProgress = false,
        withCredentials = false
    }) {

        headers.append('Content-Type', 'application/json;charset=UTF-8');

        const req = new HttpRequest(method, url, body, { headers, params, reportProgress, withCredentials, responseType });
        return req;
    }


    mapToBody<T>(response: Observable<HttpEvent<T>>): Observable<T>
    mapToBody<T>(response: Observable<HttpResponse<T>>): Observable<T> {

        return response.pipe(
            filter(res => res instanceof HttpResponse),
            // tap(res => console.log(res.status)),
            map(res => (<HttpResponse<T>>res).body || <T>{})
        );
    }
}
