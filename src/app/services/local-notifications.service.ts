import {Injectable} from '@angular/core';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

@Injectable({
    providedIn: 'root'
})
export class LocalNotificationsService {

    constructor(private ln: LocalNotifications) {
    }

    localNotifications(data: any) {
        this.ln.schedule({
            title: data.title,
            text: data.body,
        });
    }
}
