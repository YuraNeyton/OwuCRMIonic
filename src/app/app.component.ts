import {Component} from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';
import {NotificationFCMService} from './services/notification-fcm.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    showMenu: boolean;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private menuCtrl: MenuController,
        private authService: AuthService,
        private fcm: NotificationFCMService,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.showMenu = !!window.localStorage.getItem('principal');
            this.authService.menuShowIfLogin.subscribe(value => {
                this.showMenu = !!value;
            });
            this.fcm.$subscribe.subscribe(() => {
                this.fcm.onNotification();
            });
        });
    }

    closeMenu() {
        this.menuCtrl.close('first');
    }
}
