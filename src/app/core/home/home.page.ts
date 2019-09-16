import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {ApplicationService} from '../../services/application.service';
import {Application} from '../../models/application';
import {EapplicationService} from '../../services/eapplication.service';
import {Eapplication} from '../../models/eapplication';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    applications: Application[];
    eapplications: Eapplication[];

    constructor(
        private authService: AuthService,
        private router: Router,
        private menuCtr: MenuController,
        private applicationService: ApplicationService,
        private eapplicationService: EapplicationService
    ) {
    }

    ngOnInit() {
        this.closeMenu();
    }

    logout() {
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/']);
            this.authService.menuShowIfLogin.next(false);
        });
    }

    public closeMenu() {
        this.menuCtr.close('first');
    }

    segmentChanged(e) {
        console.log(e.detail.value);
        if (e.detail.value === 'application') {
            this.applicationService.getApplications().subscribe(value => {
                this.applications = value;
                console.log(value);
            });
        } else if (e.detail.value === 'e-application') {
            this.eapplicationService.getEapplications().subscribe(value => {
                this.eapplications = value;
                console.log(value);
            });
        }
    }
}
