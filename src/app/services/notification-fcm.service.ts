import {Injectable} from '@angular/core';
import {FCM} from '@ionic-native/fcm/ngx';
import {LocalNotificationsService} from './local-notifications.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NotificationFCMService {
    $subscribe = new Subject();

    constructor(
        private fcm: FCM,
        private ln: LocalNotificationsService,
        private router: Router
    ) {
    }

    getToken() {
        this.fcm.getToken().then(token => {
            console.log('token: ' + token);
        });
    }

    onNotification() {
        this.fcm.subscribeToTopic('e-application');
        this.fcm.onNotification().subscribe(msg => {
            this.ln.localNotifications(msg);
            if (msg.wasTapped) {
                this.router.navigate(['e-applications']);
            }
        });
    }

    unsubscribeFromTopic(topic: string) {
        this.fcm.unsubscribeFromTopic(topic);
    }
}
