import {Injectable} from '@angular/core';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LocalNotificationsService {

    constructor(private ln: LocalNotifications, private router: Router) {
        ln.on('click').subscribe(value => {
                this.router.navigate(['e-applications']);
        });
    }

    localNotifications(data: any) {
        this.ln.schedule({
            title: data.title,
            text: data.body,
        });
    }
}
