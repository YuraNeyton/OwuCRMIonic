import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    credentials = {login: '', password: ''};


    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    login() {
        this.authService.login(this.credentials)
            .subscribe(
                (principal) => {
                    if (principal) {
                        this.router.navigate(['/home']);
                        console.log(principal);
                        this.authService.menuShowIfLogin.next(true);
                    }
                },
                (err) => {
                    // if (!this.loginWrapper.nativeElement.classList.contains('error-form')) {
                    //     this.loginWrapper.nativeElement.classList.add('error-form');
                    // }
                }
            );
    }
}
