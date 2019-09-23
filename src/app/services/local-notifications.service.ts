import {Injectable} from '@angular/core';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

@Injectable({
    providedIn: 'root'
})
export class LocalNotificationsService {

    constructor(private ln: LocalNotifications) {
    }

    localNotifications(data: any) {
        console.log(data);
        this.ln.schedule({
            id: 1,
            text: 'dada',
        });
    }
}
