import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MenuController, ModalController} from '@ionic/angular';
import {ApplicationService} from '../../services/application.service';
import {Application} from '../../models/application';
import {EapplicationService} from '../../services/eapplication.service';
import {Eapplication} from '../../models/eapplication';
import {HomeFilterComponent} from './home-filter/home-filter.component';
import {City} from '../../models/city';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    @Input() byGroupId;
    @Input() byClientId;
    appDateInput;
    applications: Application[];
    eapplications: Eapplication[];
    applicationPage = true;
    eapplicationPage = false;
    sort = '';
    pageIndex = 1;
    pageSize = 50;
    countOfPages = 1;
    filter: any = {};

    constructor(
        private authService: AuthService,
        private router: Router,
        private menuCtr: MenuController,
        private applicationService: ApplicationService,
        private eapplicationService: EapplicationService,
        public modalController: ModalController,
    ) {
    }

    ngOnInit() {
        this.closeMenu();
        if (this.applicationPage) {
            this.loadApplications();
        }
        this.loadFiltered();
    }

    async presentModal() {

        console.log(this.authService.getLocalPrincipal());
        const modal = await this.modalController.create({
            component: HomeFilterComponent,
        });
        // this.segmentChanged('application');
        return await modal.present();
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

    loadFiltered() {
        this.applicationService.$Filter.subscribe((value: any) => {
            this.filter = value;
            console.log(this.filter);
            this.loadApplications();
        });
    }

    loadApplications() {
        const filterToSend = this.getFilterToSend();
        this.applicationService.getApplications({
            q: filterToSend,
            sort: this.sort ? this.sort : 'createdAt DESC',
            limit: this.pageSize,
            offset: (this.pageIndex * this.pageSize) - this.pageSize,
            include: ['client', 'course', 'group', 'city']
        }).subscribe((value: any) => {
            this.applications = value.models;
            // this.applicationPage = !this.applicationPage;
            // this.eapplicationPage = false;
        });
    }

    segmentChanged(e) {
        if (e.detail.value === 'application') {
            const filterToSend = this.getFilterToSend();
            this.applicationService.getApplications({
                q: filterToSend,
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

    private getFilterToSend() {
        const res: any = {};

        if (this.filter['client.fullname']) {
            res.client = {fullname: `${this.filter['client.fullname']}`};
        }
        if (this.filter['course.name']) {
            res.course = {name: `${this.filter['course.name']}`};
        }
        if (this.filter['group.name']) {
            res.group = {name: `${this.filter['group.name']}`};
        }
        if (this.filter['city.name']) {
            res.city = {name: `${this.filter['city.name']}`};
        }
        if (this.filter.certificate) {
            res.certificate = {$like: `${this.filter.certificate}`};
        }
        if (this.filter.fullPrice) {
            res.fullPrice = this.filter.fullPrice;
        }
        if (this.filter.discount) {
            res.discount = this.filter.discount;
        }
        if (this.filter.wantPractice === '+' || this.filter.wantPractice === '-') {
            res.wantPractice = this.filter.wantPractice === '+' ? 1 : this.filter.wantPractice === '-' ? 0 : null;
        }
        if (this.filter.needLaptop === '+' || this.filter.needLaptop === '-') {
            res.needLaptop = this.filter.needLaptop === '+' ? 1 : this.filter.needLaptop === '-' ? 0 : null;
        }
        if (this.filter.hasPractice === '+' || this.filter.hasPractice === '-') {
            res.hasPractice = this.filter.hasPractice === '+' ? 1 : this.filter.hasPractice === '-' ? 0 : null;
        }
        if (this.filter.gotLaptop === '+' || this.filter.gotLaptop === '-') {
            res.gotLaptop = this.filter.gotLaptop === '+' ? 1 : this.filter.gotLaptop === '-' ? 0 : null;
        }
        if (this.filter.leftToPay) {
            res.leftToPay = this.filter.leftToPay;
        }
        if (this.byGroupId) {
            res.group = {id: this.byGroupId, ...res.group};
        }
        if (this.byClientId) {
            res.client = {id: this.byClientId, ...res.client};
        }
        const cities: City[] = JSON.parse(localStorage.getItem('cities'));

        if (!this.byClientId) {
            res.$or = [
                {
                    cityId: cities.map(c => c.id)
                },
                {
                    cityId: null
                }
            ];
        }
        if (this.appDateInput) {
            res.date = this.appDateInput;
        }

        return res;
    }

    filterLabel(field) {
        if (field === 'client.fullname') {
            this.filter['client.fullname'] = '';
            this.loadApplications();
        } else if (field === 'city.name') {
            this.filter['city.name'] = '';
            this.loadApplications();
        } else if (field === 'course.name') {
            this.filter['course.name'] = '';
            this.loadApplications();
        } else if (field === 'group.name') {
            this.filter['group.name'] = '';
            this.loadApplications();
        } else if (field === 'fullPrice') {
            this.filter.fullPrice = '';
            this.loadApplications();
        } else if (field === 'leftToPay') {
            this.filter.leftToPay = '';
            this.loadApplications();
        }
    }
}
