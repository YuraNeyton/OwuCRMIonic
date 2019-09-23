import {Component, OnInit, Renderer2} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NotificationFCMService} from '../../services/notification-fcm.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    credentials = {login: '', password: ''};

    constructor(
        private authService: AuthService,
        private router: Router,
        private renderer: Renderer2,
        private fcm: NotificationFCMService
    ) {
    }

    ngOnInit() {
        if (localStorage.getItem('principal')) {
            this.router.navigate(['/home']);
        }
    }

    login() {
        this.authService.login(this.credentials)
            .subscribe(
                (principal) => {
                    if (principal) {
                        this.router.navigate(['/home']);
                        console.log(principal);
                        this.authService.menuShowIfLogin.next(true);
                        this.fcm.subscribeToTopic('e-application');
                    }
                },
                (err) => {
                    if (err) {
                        const inputs = document.getElementsByTagName('input');
                        this.renderer.setStyle(inputs.item(0), 'border', '2px solid #bf2c2c');
                        this.renderer.setStyle(inputs.item(1), 'border', '2px solid #bf2c2c');


                    }
                }
            );
    }

    styleChange(element) {
        this.renderer.setStyle(element, 'border', '2px solid #3498db');
    }
}
