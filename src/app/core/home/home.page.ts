import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    logout() {
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/']);
            this.authService.menuShowIfLogin.next(false);
        });
    }
}
