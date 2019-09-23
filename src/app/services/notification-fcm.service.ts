import {Injectable} from '@angular/core';
import {FCM} from '@ionic-native/fcm/ngx';

@Injectable({
    providedIn: 'root'
})
export class NotificationFCMService {

    constructor(
        private fcm: FCM
    ) {
    }

    subscribeToTopic(topic: string) {
        this.fcm.subscribeToTopic(topic);
    }

    getToken() {
        this.fcm.getToken().then(token => {
            console.log('token: ' + token);
        });
    }

    onNotification() {
        return this.fcm.onNotification();
    }

    unsubscribeFromTopic(topic: string) {
        this.fcm.unsubscribeFromTopic(topic);
    }
}
