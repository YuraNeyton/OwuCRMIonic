import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable, Subject} from 'rxjs';
import {Manager} from '../models/manager';
import {map} from 'rxjs/operators';
import {Roles} from '../models/roles';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public principal: Manager = null;
    public roles = Roles;
    public logoutLoginSubject = new Subject();
    public menuShowIfLogin = new Subject();
    private authURL = '';

    constructor(
        private http: HttpClient,
        private config: ConfigService
    ) {
        this.authURL = config.api + '/auth';
    }

    public login(credentials: { login: string, password: string }): Observable<Manager> {
        return this.http.post<Manager>(`${this.authURL}/login`, credentials)
            .pipe(map(p => {
                if (p && Array.isArray(p.role)) {
                    p.role = p.role[0];
                }
                this.principal = p;
                const principalForLocalStorage = {
                    role: p.role,
                };
                this.logoutLoginSubject.next(principalForLocalStorage.role);
                const principalJson = JSON.stringify(principalForLocalStorage);
                window.localStorage.setItem('principal', principalJson);
                return this.principal;
            }));
    }

    public logout(): Observable<any> {
        return this.http.get<any>(`${this.authURL}/logout`).pipe(map(p => {
            this.principal = null;
            window.localStorage.removeItem('principal');
            this.logoutLoginSubject.next('exit');
            return null;
        }));
    }

    public getPrincipal(): Observable<Manager> {
        return this.http.get<Manager>(`${this.authURL}/principal`)
            .pipe(map(p => {
                if (p && Array.isArray(p.role)) {
                    p.role = p.role[0];
                }
                this.principal = p;
                return this.principal;
            }));
    }

    public getLocalPrincipal() {
        return this.principal;
    }

}
