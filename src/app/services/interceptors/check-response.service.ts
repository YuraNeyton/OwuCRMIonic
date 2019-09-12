import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {ConfigService} from '../config.service';
import {Observable} from 'rxjs';
import {DbLoadStatusService} from '../db-load-status.service';

@Injectable({
  providedIn: 'root'
})
export class CheckResponseService implements HttpInterceptor {

    private counter = 0;
    apiUrlsArr = [];
    interval: any;
    reqst: any;

    constructor(
        private dbLoadStatusService: DbLoadStatusService,
        private configService: ConfigService
    ) {
    }

    startInterval() {
        this.interval = setInterval(() => {
            if (this.apiUrlsArr) {
                this.apiUrlsArr.shift();
            }
        }, 5);
    }

    stopIntervar() {
        setTimeout( () => {
            clearInterval(this.interval);
        }, 50);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const updatedReq = req.clone({
            url: this.configService.host, method: 'GET'
        });
        this.reqst = req;
        if (req.url.indexOf('api') > -1) {
            if (req.method === 'POST' || req.method === 'UPDATE' || req.method === 'DELETE') {
                if (this.apiUrlsArr.indexOf(req.url) > -1) {
                    this.startInterval();
                    this.reqst = updatedReq;
                    this.stopIntervar();
                } else {
                    this.apiUrlsArr.push(req.url);
                    this.startInterval();
                    this.stopIntervar();
                }
            }
            this.dbLoadStatusService.$statusPreloadingData.next('true');
            this.counter++;
        }
        return next.handle(this.reqst).pipe(
            tap((event: HttpResponse<any>) => {
                    if (event.url) {
                        if (event.url.indexOf('api') > -1) {
                            this.counter--;
                            if (this.counter === 0) {
                                this.dbLoadStatusService.$statusPreloadingData.next('false');
                            }
                        }
                    }
                }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.url.indexOf('api') > -1  || err.url.indexOf(this.configService.host) > -1) {
                            this.counter--;
                            if (this.counter === 0) {
                                this.dbLoadStatusService.$statusPreloadingData.next('false');
                            }
                        }
                    }
                }
            ));
    }
}
