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
    applicationPage = true;
    eapplicationPage = false;
    sort = '';
    pageIndex = 1;
    pageSize = 50;
    countOfPages = 1;

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
        if (this.applicationPage) {
            this.applicationService.getApplications({
                q: {},
                sort: this.sort ? this.sort : 'createdAt DESC',
                limit: this.pageSize,
                offset: (this.pageIndex * this.pageSize) - this.pageSize,
                include: ['client', 'course', 'group', 'city']
            }).subscribe((value: any) => {
                this.applications = value.models;
            });
        }
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
        if (e.detail.value === 'application') {
            this.applicationService.getApplications({
                q: {},
                sort: this.sort ? this.sort : 'createdAt DESC',
                limit: this.pageSize,
                offset: (this.pageIndex * this.pageSize) - this.pageSize,
                include: ['client', 'course', 'group', 'city']
            }).subscribe((value: any) => {
                this.applications = value.models;
                this.applicationPage = !this.applicationPage;
                this.eapplicationPage = false;
            });
        } else if (e.detail.value === 'e-application') {
            this.eapplicationService.getEapplications().subscribe((value: any) => {
                this.eapplications = value.models;
                this.applicationPage = false;
                this.eapplicationPage = !this.eapplicationPage;
            });
        }
    }
}
