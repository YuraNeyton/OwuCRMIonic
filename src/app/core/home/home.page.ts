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
import {NotificationFCMService} from '../../services/notification-fcm.service';
import {MaterialTableService} from '../../services/material-table.service';
import * as moment from 'moment';
import {TableService} from '../../services/table.service';

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
    footerShow = true;
    sort = '';
    count = 0;
    pageIndex = 1;
    pageSize = 17;
    countOfPages = 1;
    filter: any = {};
    tableListCount = 0;


    constructor(
        private authService: AuthService,
        private router: Router,
        private menuCtr: MenuController,
        private applicationService: ApplicationService,
        private eapplicationService: EapplicationService,
        private modalController: ModalController,
        private fcm: NotificationFCMService,
        private materialTableService: MaterialTableService,
        private tableService: TableService
    ) {
    }

    ngOnInit() {
        this.closeMenu();
        if (this.applicationPage) {
            this.loadApplications();
        }
        this.applicationService.$getHeader.subscribe((value: any) => {
            this.loadSorted(value.name, value.element, value.e);
        });
        this.loadFiltered();
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: HomeFilterComponent,
            componentProps: {component: 'homePage'}
        });
        return await modal.present();
    }

    loadSorted(key: string, headerBlock: HTMLElement, event: any) {
        this.sort = this.materialTableService.sort(key, headerBlock, event);
        this.loadApplications();
    }

    logout() {
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/']);
            this.authService.menuShowIfLogin.next(false);
            this.fcm.unsubscribeFromTopic('e-application');
        });
    }

    public closeMenu() {
        this.menuCtr.close('first');
    }

    loadFiltered() {
        this.applicationService.$Filter.subscribe((value: any) => {
            if (value.c === 'homePage') {
                this.filter = value.f;
                this.pageIndex = 1;
                this.loadApplications();
            }
        });
    }

    sendLoadApplications() {
        const filterToSend = this.getFilterToSend();
        return this.applicationService.getApplications({
            q: filterToSend,
            sort: this.sort ? this.sort : 'createdAt DESC',
            limit: this.pageSize,
            offset: (this.pageIndex * this.pageSize) - this.pageSize,
            include: ['client', 'course', 'group', 'city']
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
            this.footerShow = true;
        } else if (e.detail.value === 'e-application') {
            this.eapplicationService.getEapplications().subscribe((value: any) => {
                this.eapplications = value.models;
                this.applicationPage = false;
                this.eapplicationPage = !this.eapplicationPage;
            });
            this.footerShow = false;
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
        if (this.filter.appDateInput) {
            res.date = moment(this.filter.appDateInput).format('YYYY-MM-DDT00:00:00.000') + 'Z';
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
        } else if (field === 'appDateInput') {
            this.filter.appDateInput = '';
            this.loadApplications();
        }
    }

    public loadPaginated(offset: number, e: any) {
        this.pageIndex = this.materialTableService.calcNextPage({
            countOfPages: this.countOfPages,
            currentPage: this.pageIndex,
            nextOffset: offset,
            nextPage: e ? e.target.value : 0,
            event: e
        });
        this.loadApplications();
        if (offset === 1) {
            if (this.countOfPages !== 1) {
                this.tableListCount += this.pageSize;
            }
        } else {
            if (this.tableListCount !== 0) {
                this.tableListCount -= this.pageSize;
            }

        }
    }

    public loadApplications() {
        if (this.pageSize) {
            this.sendLoadApplications().subscribe(response => {
                this.count = response.count;
                this.applications = response.models;
                this.countOfPages = this.materialTableService.calcCountOfPages(this.count, this.pageSize);
            });
        }
    }

    doRefresh(e) {
        setTimeout(() => {
            this.ngOnInit();
            e.target.complete();
        }, 550);
    }

    changePage(event) {
        if (event.direction === 2) {
            this.loadPaginated(1, null);
        } else if (event.direction === 4) {
            this.loadPaginated(-1, null);
        }
    }
}

