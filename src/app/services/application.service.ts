import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {Observable, Subject} from 'rxjs';
import {addParams} from '../helpers/url-helper';
import {Application} from '../models/application';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    $Filter = new Subject();
    $getHeader = new Subject();
    private applicationsURL = '';

    constructor(
        private http: HttpClient,
        private config: ConfigService
    ) {
        this.applicationsURL = config.api + '/applications';
    }

    getApplicationById(id: number, query = {}): Observable<Application> {
        const urlToRequest = addParams(`${this.applicationsURL}/${id}`, query);
        return this.http.get<Application>(urlToRequest);
    }

    getApplications(query = {}): Observable<any> {
        const urlToRequest = addParams(this.applicationsURL, query);
        return this.http.get<any>(urlToRequest);
    }

    create(model: Application): Observable<Application> {
        return this.http.post<Application>(this.applicationsURL, model);
    }

    createByEapp(model): Observable<any> {
        return this.http.post<any>(`${this.config.api}/app-by-eapp`, model);
    }

    remove(id: number | string): Observable<Application> {
        return this.http.delete<Application>(`${this.applicationsURL}/${id}`);
    }

    update(id: number, application: any): Observable<Application> {
        return this.http.put<Application>(`${this.applicationsURL}/${id}`, application);
    }

}
